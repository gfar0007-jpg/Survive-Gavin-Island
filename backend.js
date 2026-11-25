/* Survive Gavin Island - data layer.
   Two interchangeable back ends with the same API:
   - "firebase": the real thing (accounts, chat, tickets shared by everyone). Used when firebase-config.js has your keys.
   - "demo": stores everything in this one browser so the site can be tried before Firebase is set up. */
(function () {
  'use strict';
  var DOMAIN = '@survivegavin.players';           // usernames become fake emails, so nobody needs a real email address
  var NAME_RE = /^[A-Za-z0-9_]{3,16}$/;
  var LINK_RE = /(https?:|www\.|ftp:|[a-z0-9]\.(com|net|org|io|gg|ly|me|tv|xyz|co|app|dev|info|biz|ru|cn)([^a-z]|$)|@[a-z0-9]+\.)/i;

  function err(msg) { var e = new Error(msg); e.friendly = true; return e; }
  function checkName(name) {
    if (!NAME_RE.test(name || '')) throw err('Names are 3 to 16 letters, numbers or underscores.');
  }
  function checkPass(pw) {
    if (!pw || pw.length < 6) throw err('Passwords need at least 6 characters.');
  }
  function hasLink(t) { return LINK_RE.test(t); }

  /* ---------------------------------------------------------------- Firebase */
  function makeFirebase(cfg) {
    var app = firebase.initializeApp(cfg);
    var auth = firebase.auth(), db = firebase.firestore();
    var TS = firebase.firestore.FieldValue.serverTimestamp;
    var userCb = function () {}, busy = false, current = null;

    function ms(d) { return d && d.toMillis ? d.toMillis() : Date.now(); }
    function mapCode(e) {
      var c = e && e.code || '';
      if (c === 'auth/email-already-in-use') return err('That name is already taken. Try another one.');
      if (c === 'auth/invalid-credential' || c === 'auth/wrong-password' || c === 'auth/user-not-found' || c === 'auth/invalid-login-credentials') return err('Wrong name or password.');
      if (c === 'auth/too-many-requests') return err('Too many tries. Wait a minute and try again.');
      if (c === 'auth/network-request-failed') return err('Can’t reach the internet right now.');
      if (c === 'auth/operation-not-allowed') return err('Sign-in isn’t switched on yet. (Site owner: enable Email/Password in Firebase.)');
      if (c === 'permission-denied' || c === 'firestore/permission-denied') return err('That wasn’t allowed. If you were just banned or the rules aren’t published yet, that’s why.');
      return e && e.friendly ? e : err('Something went wrong. Please try again.');
    }
    async function loadProfile(u) {
      if (!u) return null;
      var snap = await db.doc('users/' + u.uid).get();
      if (!snap.exists) return { uid: u.uid, name: null };
      var d = snap.data(), isAdmin = false;
      try { isAdmin = (await db.doc('admins/' + u.uid).get()).exists; } catch (e) { isAdmin = false; }
      return { uid: u.uid, name: d.name, banned: d.banned === true, isAdmin: isAdmin };
    }
    function emit(p) { current = p; userCb(p); }
    auth.onAuthStateChanged(function (u) {
      if (busy) return;
      loadProfile(u).then(function (p) {
        if (u && p && !p.name) { auth.signOut(); return; }   // half-made account, start clean
        emit(p);
      }).catch(function () { emit(u ? { uid: u.uid, name: u.email.split('@')[0] } : null); });
    });

    return {
      mode: 'firebase',
      onUser: function (cb) { userCb = cb; if (current !== null) cb(current); },
      current: function () { return current; },
      signUp: async function (name, pw) {
        checkName(name); checkPass(pw);
        var lower = name.toLowerCase(); busy = true;
        try {
          var cred;
          try { cred = await auth.createUserWithEmailAndPassword(lower + DOMAIN, pw); } catch (e) { throw mapCode(e); }
          var uid = cred.user.uid, batch = db.batch();
          batch.set(db.doc('usernames/' + lower), { uid: uid, createdAt: TS() });
          batch.set(db.doc('users/' + uid), { name: name, nameLower: lower, createdAt: TS() });
          try { await batch.commit(); }
          catch (e) { try { await cred.user.delete(); } catch (x) { /* ignore */ } throw err('That name is already taken. Try another one.'); }
          busy = false; emit(await loadProfile(cred.user));
        } finally { busy = false; }
      },
      signIn: async function (name, pw) {
        checkName(name); checkPass(pw);
        try { await auth.signInWithEmailAndPassword(name.toLowerCase() + DOMAIN, pw); } catch (e) { throw mapCode(e); }
      },
      signOut: function () { return auth.signOut(); },

      watchMessages: function (cb, onErr) {
        return db.collection('messages').orderBy('createdAt', 'desc').limit(80).onSnapshot(function (s) {
          cb(s.docs.map(function (d) { var x = d.data({ serverTimestamps: 'estimate' }); return { id: d.id, uid: x.uid, name: x.name, text: x.text, ts: ms(x.createdAt), staff: !!x.staff }; }).reverse());
        }, function (e) { if (onErr) onErr(mapCode(e)); });
      },
      sendMessage: async function (text, asStaff) {
        var u = current; if (!u) throw err('Sign in first.');
        var doc = { uid: u.uid, name: u.name, text: text, createdAt: TS() };
        if (asStaff && u.isAdmin) doc.staff = true;
        try { await db.collection('messages').add(doc); } catch (e) { throw mapCode(e); }
      },
      deleteMessage: function (id) { return db.doc('messages/' + id).delete().catch(function (e) { throw mapCode(e); }); },
      reportMessage: async function (m) {
        try { await db.collection('reports').add({ messageId: m.id, msgUid: m.uid, msgName: m.name, msgText: m.text.slice(0, 200), reporterUid: current.uid, createdAt: TS() }); }
        catch (e) { throw mapCode(e); }
      },
      watchReports: function (cb) {
        return db.collection('reports').orderBy('createdAt', 'desc').limit(100).onSnapshot(function (s) {
          cb(s.docs.map(function (d) { var x = d.data({ serverTimestamps: 'estimate' }); return { id: d.id, messageId: x.messageId, msgUid: x.msgUid, msgName: x.msgName, msgText: x.msgText, ts: ms(x.createdAt) }; }));
        }, function () { cb([]); });
      },
      dismissReport: function (id) { return db.doc('reports/' + id).delete(); },

      submitTicket: async function (t) {
        var u = current; if (!u) throw err('Sign in first.');
        var ref = db.collection('tickets').doc(), batch = db.batch();
        batch.set(ref, { uid: u.uid, name: u.name, kind: t.kind, title: t.title, body: t.body, hasShot: !!t.shot, status: 'open', createdAt: TS() });
        if (t.shot) batch.set(ref.collection('shots').doc('main'), { data: t.shot });
        try { await batch.commit(); } catch (e) { throw mapCode(e); }
      },
      watchTickets: function (cb, onErr) {
        return db.collection('tickets').orderBy('createdAt', 'desc').limit(150).onSnapshot(function (s) {
          cb(s.docs.map(function (d) { var x = d.data({ serverTimestamps: 'estimate' }); return { id: d.id, uid: x.uid, name: x.name, kind: x.kind, title: x.title, body: x.body, hasShot: !!x.hasShot, status: x.status, reply: x.reply || '', ts: ms(x.createdAt) }; }));
        }, function (e) { if (onErr) onErr(mapCode(e)); });
      },
      getShot: async function (id) { var s = await db.doc('tickets/' + id + '/shots/main').get(); return s.exists ? s.data().data : null; },
      updateTicket: function (id, patch) { patch.updatedAt = TS(); return db.doc('tickets/' + id).update(patch).catch(function (e) { throw mapCode(e); }); },
      deleteTicket: function (id) { return db.doc('tickets/' + id).delete().catch(function (e) { throw mapCode(e); }); },

      watchUsers: function (cb) {
        return db.collection('users').orderBy('createdAt', 'desc').limit(300).onSnapshot(function (s) {
          cb(s.docs.map(function (d) { var x = d.data({ serverTimestamps: 'estimate' }); return { uid: d.id, name: x.name, banned: x.banned === true, ts: ms(x.createdAt) }; }));
        }, function () { cb([]); });
      },
      setBanned: function (uid, flag) { return db.doc('users/' + uid).update({ banned: !!flag }).catch(function (e) { throw mapCode(e); }); }
    };
  }

  /* ------------------------------------------------------------------- Demo */
  function makeDemo() {
    var KEY = 'sgi_demo_v1', userCb = function () {}, current = null, subs = [];
    function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
    var mem = null;
    function db() { if (!mem) mem = load(); mem.users = mem.users || []; mem.messages = mem.messages || []; mem.tickets = mem.tickets || []; mem.reports = mem.reports || []; mem.session = mem.session || null; return mem; }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(db())); } catch (e) { /* storage full or blocked */ } }
    function fire() { subs.slice().forEach(function (f) { f(); }); }
    window.addEventListener('storage', function (e) { if (e.key === KEY) { mem = null; sync(); fire(); } });
    function id() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
    function sync() {
      var s = db().session, u = s && db().users.filter(function (x) { return x.uid === s; })[0];
      current = u ? { uid: u.uid, name: u.name, banned: !!u.banned, isAdmin: u.name.toLowerCase() === 'admin' } : null;
      userCb(current);
    }
    function sub(getter, cb) { var f = function () { cb(getter()); }; subs.push(f); f(); return function () { subs = subs.filter(function (x) { return x !== f; }); }; }
    return {
      mode: 'demo',
      onUser: function (cb) { userCb = cb; sync(); },
      current: function () { return current; },
      signUp: async function (name, pw) {
        checkName(name); checkPass(pw);
        if (db().users.some(function (u) { return u.name.toLowerCase() === name.toLowerCase(); })) throw err('That name is already taken. Try another one.');
        var u = { uid: id(), name: name, pw: pw, ts: Date.now() }; db().users.push(u); db().session = u.uid; save(); sync(); fire();
      },
      signIn: async function (name, pw) {
        checkName(name); checkPass(pw);
        var u = db().users.filter(function (x) { return x.name.toLowerCase() === name.toLowerCase() && x.pw === pw; })[0];
        if (!u) throw err('Wrong name or password.');
        db().session = u.uid; save(); sync();
      },
      signOut: async function () { db().session = null; save(); sync(); },
      watchMessages: function (cb) { return sub(function () { return db().messages.slice(-80); }, cb); },
      sendMessage: async function (text, asStaff) {
        if (!current) throw err('Sign in first.'); if (current.banned) throw err('That wasn’t allowed.');
        if (text.length > 200 || hasLink(text)) throw err('That wasn’t allowed.');
        db().messages.push({ id: id(), uid: current.uid, name: current.name, text: text, ts: Date.now(), staff: !!(asStaff && current.isAdmin) }); save(); fire();
      },
      deleteMessage: async function (mid) { db().messages = db().messages.filter(function (m) { return m.id !== mid; }); save(); fire(); },
      reportMessage: async function (m) { db().reports.unshift({ id: id(), messageId: m.id, msgUid: m.uid, msgName: m.name, msgText: m.text, ts: Date.now() }); save(); fire(); },
      watchReports: function (cb) { return sub(function () { return db().reports.slice(); }, cb); },
      dismissReport: async function (rid) { db().reports = db().reports.filter(function (r) { return r.id !== rid; }); save(); fire(); },
      submitTicket: async function (t) {
        if (!current) throw err('Sign in first.');
        if (hasLink(t.title) || hasLink(t.body)) throw err('Please leave web links out.');
        db().tickets.unshift({ id: id(), uid: current.uid, name: current.name, kind: t.kind, title: t.title, body: t.body, hasShot: !!t.shot, shot: t.shot || null, status: 'open', reply: '', ts: Date.now() }); save(); fire();
      },
      watchTickets: function (cb) { return sub(function () { return db().tickets.map(function (t) { var c = Object.assign({}, t); delete c.shot; return c; }); }, cb); },
      getShot: async function (tid) { var t = db().tickets.filter(function (x) { return x.id === tid; })[0]; return t && t.shot || null; },
      updateTicket: async function (tid, patch) { var t = db().tickets.filter(function (x) { return x.id === tid; })[0]; if (t) Object.assign(t, patch); save(); fire(); },
      deleteTicket: async function (tid) { db().tickets = db().tickets.filter(function (x) { return x.id !== tid; }); save(); fire(); },
      watchUsers: function (cb) { return sub(function () { return db().users.map(function (u) { return { uid: u.uid, name: u.name, banned: !!u.banned, ts: u.ts }; }); }, cb); },
      setBanned: async function (uid, flag) { var u = db().users.filter(function (x) { return x.uid === uid; })[0]; if (u) u.banned = !!flag; save(); sync(); fire(); }
    };
  }

  window.SGI_makeBackend = function () {
    var cfg = window.SGI_FIREBASE;
    var ready = cfg && cfg.apiKey && cfg.projectId && !/PASTE/i.test(cfg.apiKey) && window.firebase;
    if (ready) { try { return makeFirebase(cfg); } catch (e) { console.error(e); } }
    return makeDemo();
  };
  window.SGI_hasLink = hasLink;
})();

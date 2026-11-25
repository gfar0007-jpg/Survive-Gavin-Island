/* Survive Gavin Island - website behaviour. Every piece of user text is inserted with textContent, never as HTML. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var B = window.SGI_makeBackend();
  var user = null, unsubs = [], msgs = [], tickets = [], filter = 'all', openTickets = {}, lastCount = null, reported = {}, lastSend = 0, lastText = '', lastTextAt = 0;

  function el(tag, props, kids) {
    var n = document.createElement(tag), k;
    props = props || {};
    for (k in props) {
      if (k === 'class') n.className = props[k];
      else if (k === 'text') n.textContent = props[k];
      else if (k === 'on') { for (var ev in props.on) n.addEventListener(ev, props.on[ev]); }
      else n.setAttribute(k, props[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var toastT;
  function toast(t) { var n = $('toast'); n.textContent = t; n.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { n.hidden = true; }, 3200); }
  function ago(ts) {
    var s = Math.max(1, Math.round((Date.now() - ts) / 1000));
    if (s < 60) return 'just now'; if (s < 3600) return Math.round(s / 60) + ' min ago'; if (s < 86400) return Math.round(s / 3600) + ' h ago';
    return Math.round(s / 86400) + ' d ago';
  }
  function clock(ts) { try { return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function say(e) { return (e && e.friendly) ? e.message : 'Something went wrong. Please try again.'; }

  if (B.mode === 'demo') $('demoBar').hidden = false;
  if (B.mode === 'demo' || /[?&]owner=1/.test(location.search)) window.SGI_ALLOW_RESERVED = true;

  /* ------------------------------------------------------------ updates */
  (function () {
    var list = (window.SGI_UPDATES || []).slice().reverse(), box = $('updateList'), more = $('moreUpdates'), SHOW = 5;
    function card(u, i) {
      var h = el('h3', null, [el('span', { class: 'ver', text: 'v' + u.version }), u.title]);
      if (i === 0) h.appendChild(el('span', { class: 'latest', text: 'Latest' }));
      if (u.date) h.appendChild(el('span', { class: 'when', text: u.date }));
      var ul = el('ul'); u.notes.forEach(function (n) { ul.appendChild(el('li', { text: n })); });
      var kids = [h, ul];
      if (u.fixes && u.fixes.length) {
        var fx = el('div', { class: 'upd-fixes' }, [el('h4', { text: 'Bugs and fixes' })]);
        u.fixes.forEach(function (f) {
          fx.appendChild(el('p', { class: 'bug' }, [el('b', { text: 'Bug' }), f.bug]));
          fx.appendChild(el('p', { class: 'fix' }, [el('b', { text: 'Fix' }), f.fix]));
        });
        kids.push(fx);
      }
      return el('article', { class: 'upd' }, kids);
    }
    list.forEach(function (u, i) { var c = card(u, i); if (i >= SHOW) c.hidden = true, c.dataset.old = '1'; box.appendChild(c); });
    if (list.length > SHOW) {
      more.hidden = false; more.textContent = 'Show older updates (' + (list.length - SHOW) + ')';
      more.addEventListener('click', function () { box.querySelectorAll('[data-old]').forEach(function (c) { c.hidden = false; }); more.hidden = true; });
    }
  })();

  /* ------------------------------------------------------------ bugs found */
  (function () {
    var box = $('bugList'), done = false, tn = $('tabNew'), tb = $('tabBugs');
    function show(bugs) {
      $('updatePane').hidden = bugs; box.hidden = !bugs;
      tn.classList.toggle('on', !bugs); tb.classList.toggle('on', bugs);
      tn.setAttribute('aria-selected', String(!bugs)); tb.setAttribute('aria-selected', String(bugs));
      if (bugs && !done) { done = true; (window.SGI_BUGS || []).slice().reverse().forEach(function (s) { box.appendChild(renderBugStory(s)); }); }
    }
    tn.addEventListener('click', function () { show(false); }); tb.addEventListener('click', function () { show(true); });
  })();

  /* ----------------------------------------------------------- download */
  (function () {
    var ups = window.SGI_UPDATES || [], verEl = $('dlVer');
    if (verEl && ups.length) verEl.textContent = 'v' + ups[ups.length - 1].version;
    var url = window.SGI_DOWNLOAD_URL, dl = $('dlBtn');
    if (!url || /DOWNLOAD_URL_HERE/.test(url)) {
      dl.setAttribute('aria-disabled', 'true'); dl.removeAttribute('download');
      dl.addEventListener('click', function (e) { e.preventDefault(); toast('The Windows download isn’t ready yet. Check back soon!'); });
    } else dl.href = url;
  })();

  /* --------------------------------------------------------- chat shell */
  var panel = $('chatPanel'), fab = $('chatFab');
  function chatOpen() { return !panel.hidden; }
  function openChat() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); fab.classList.add('open'); $('chatDot').hidden = true;
    setTimeout(function () { (user ? $('mText') : $('aName')).focus({ preventScroll: true }); }, 60);
    scrollMsgs(true);
  }
  function closeChat() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.classList.remove('open'); $('emojiPick').hidden = true; fab.focus(); }
  fab.addEventListener('click', function () { chatOpen() ? closeChat() : openChat(); });
  $('chatClose').addEventListener('click', closeChat);
  document.querySelectorAll('[data-open-chat]').forEach(function (b) { b.addEventListener('click', openChat); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!$('adminModal').hidden) { $('adminModal').hidden = true; return; }
    if (!$('emojiPick').hidden) { $('emojiPick').hidden = true; return; }
    if (chatOpen()) closeChat();
  });

  /* ------------------------------------------------------------- sign in */
  var mode = 'in';
  function setMode(m) {
    mode = m; $('tabIn').classList.toggle('on', m === 'in'); $('tabUp').classList.toggle('on', m === 'up');
    $('tabIn').setAttribute('aria-selected', m === 'in'); $('tabUp').setAttribute('aria-selected', m === 'up');
    $('aGo').textContent = m === 'in' ? 'Sign in' : 'Create my account';
    $('aPass').setAttribute('autocomplete', m === 'in' ? 'current-password' : 'new-password');
    $('authHelp').hidden = m === 'in'; $('aErr').textContent = '';
  }
  $('tabIn').addEventListener('click', function () { setMode('in'); });
  $('tabUp').addEventListener('click', function () { setMode('up'); });
  setMode('in');
  $('authForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('aName').value.trim(), pw = $('aPass').value, btn = $('aGo'), errBox = $('aErr');
    errBox.textContent = '';
    if (mode === 'up') { var c = window.SGI_checkName(name); if (!c.ok) { errBox.textContent = c.why; return; } }
    btn.disabled = true;
    (mode === 'up' ? B.signUp(name, pw) : B.signIn(name, pw)).then(function () { $('aPass').value = ''; }, function (er) { errBox.textContent = say(er); }).then(function () { btn.disabled = false; });
  });
  $('outBtn').addEventListener('click', function () { B.signOut(); toast('Signed out. See you on the island!'); });

  /* ---------------------------------------------------------------- chat */
  function scrollMsgs(force) { var m = $('msgs'); if (force || m.scrollHeight - m.scrollTop - m.clientHeight < 90) m.scrollTop = m.scrollHeight; }
  function renderMsgs() {
    var box = $('msgs'), keep = box.scrollHeight - box.scrollTop - box.clientHeight < 90;
    box.textContent = '';
    if (!msgs.length) box.appendChild(el('p', { class: 'empty', text: 'No messages yet. Say hello!' }));
    msgs.forEach(function (m) {
      var mine = user && m.uid === user.uid;
      var who = el('div', { class: 'who' }, [m.name]);
      if (m.staff) who.appendChild(el('span', { class: 'staffTag', text: 'STAFF' }));
      who.appendChild(el('span', { class: 'when', text: clock(m.ts) }));
      var foot = el('div', { class: 'msgFoot' });
      if (!mine && !(user && user.isAdmin)) foot.appendChild(el('button', { class: 'msgAct', type: 'button', 'aria-label': 'Report this message', title: 'Report this message', text: reported[m.id] ? 'Reported' : '⚑ Report', on: { click: function () { report(m); } } }));
      if (mine || (user && user.isAdmin)) foot.appendChild(el('button', { class: 'msgAct', type: 'button', 'aria-label': 'Delete this message', text: 'Delete', on: { click: function () { B.deleteMessage(m.id).catch(function (er) { toast(say(er)); }); } } }));
      var node = el('div', { class: 'msg' + (mine ? ' me' : '') }, [who, el('div', { class: 'txt', text: m.text }), foot.childNodes.length ? foot : null]);
      box.appendChild(node);
    });
    if (keep) box.scrollTop = box.scrollHeight;
  }
  function report(m) {
    if (reported[m.id]) return; reported[m.id] = true;
    B.reportMessage(m).then(function () { toast('Thank you. Staff will take a look.'); renderMsgs(); }, function (er) { reported[m.id] = false; toast(say(er)); });
  }
  function onMessages(list) {
    var first = lastCount === null;
    var fresh = !first && list.length && (list[list.length - 1].id !== (msgs[msgs.length - 1] || {}).id) && list[list.length - 1].uid !== (user && user.uid);
    msgs = list; lastCount = list.length; renderMsgs();
    if (fresh && !chatOpen()) $('chatDot').hidden = false;
  }
  $('composer').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('mText'), err = $('mErr'), raw = input.value.trim(); err.textContent = '';
    if (!raw || !user) return;
    var text = window.SGI_emoticons(raw), c = window.SGI_check(text), now = Date.now();
    if (!c.ok) { err.textContent = c.why; return; }
    if (now - lastSend < 1500) { err.textContent = 'Slow down a little!'; return; }
    if (text === lastText && now - lastTextAt < 30000) { err.textContent = 'You just said that.'; return; }
    lastSend = now; lastText = text; lastTextAt = now; input.value = '';
    B.sendMessage(text, user.isAdmin).catch(function (er) { err.textContent = say(er); input.value = text; });
    $('emojiPick').hidden = true;
  });
  (function () {
    var pick = $('emojiPick');
    window.SGI_EMOJI.forEach(function (em) { pick.appendChild(el('button', { type: 'button', 'aria-label': 'Emoji ' + em, text: em, on: { click: function () { var i = $('mText'); i.value = (i.value + em).slice(0, 200); i.focus(); } } })); });
    $('emojiBtn').addEventListener('click', function () { pick.hidden = !pick.hidden; $('emojiBtn').setAttribute('aria-expanded', String(!pick.hidden)); });
  })();

  /* ------------------------------------------------------------- tickets */
  var KIND = { bug: 'Bug', idea: 'Idea', other: 'Other' };
  var STAT = { open: 'Open', planned: 'Planned', 'in-progress': 'In progress', done: 'Done', wontfix: 'Not planned' };
  var pendingRender = false;
  function matches(t) {
    if (filter === 'all') return true;
    if (filter === 'bug' || filter === 'idea') return t.kind === filter;
    if (filter === 'planned') return t.status === 'planned' || t.status === 'in-progress';
    return t.status === filter;
  }
  function renderTickets() {
    var list = $('ticketList'), msg = $('boardMsg');
    if (document.activeElement && list.contains(document.activeElement) && /TEXTAREA|SELECT/.test(document.activeElement.tagName)) { pendingRender = true; return; }
    pendingRender = false; list.textContent = '';
    if (!user) { msg.textContent = 'Sign in (the chat bubble) to see the board.'; return; }
    var shown = tickets.filter(matches);
    msg.textContent = shown.length ? '' : (tickets.length ? 'Nothing here with that filter.' : 'No tickets yet. Be the first!');
    shown.forEach(function (t) {
      var open = !!openTickets[t.id];
      var head = el('button', { type: 'button', 'aria-expanded': String(open), on: { click: function () { openTickets[t.id] = !open; renderTickets(); } } }, [
        el('div', { class: 'tkTop' }, [el('span', { class: 'tag ' + t.kind, text: KIND[t.kind] || t.kind }), el('span', { class: 'tag ' + t.status, text: STAT[t.status] || t.status })]),
        el('div', { class: 'tkTitle', text: t.title }),
        el('div', { class: 'tkMeta', text: 'by ' + t.name + ' · ' + ago(t.ts) })
      ]);
      var li = el('li', { class: 'tk' }, [head]);
      if (open) {
        var body = el('div', { class: 'tkBody' }, [el('p', { text: t.body })]);
        if (t.hasShot) { var holder = el('div', { class: 'small', text: 'Loading screenshot...' }); body.appendChild(holder); loadShot(t.id, holder); }
        if (t.reply) body.appendChild(el('p', { class: 'reply' }, [el('b', { text: 'Dad & Gavin: ' }), t.reply]));
        if (user.isAdmin) body.appendChild(adminControls(t));
        else if (user.uid === t.uid) body.appendChild(el('button', { class: 'btn small ghost', type: 'button', text: 'Delete my ticket', on: { click: function () { if (confirm('Delete this ticket?')) B.deleteTicket(t.id).catch(function (er) { toast(say(er)); }); } } }));
        li.appendChild(body);
      }
      list.appendChild(li);
    });
    $('adminBar').hidden = !(user && user.isAdmin);
  }
  function loadShot(id, holder) {
    B.getShot(id).then(function (d) { holder.textContent = ''; if (d && /^data:image\/jpeg;base64,/.test(d)) { var img = el('img', { alt: 'Screenshot attached to the ticket' }); img.src = d; holder.replaceWith(img); } }, function () { holder.textContent = 'Could not load the screenshot.'; });
  }
  function adminControls(t) {
    var sel = el('select', { 'aria-label': 'Status' }); Object.keys(STAT).forEach(function (k) { var o = el('option', { value: k, text: STAT[k] }); if (k === t.status) o.selected = true; sel.appendChild(o); });
    var reply = el('textarea', { maxlength: '1000', placeholder: 'Write a reply everyone can see (optional)', 'aria-label': 'Reply' }); reply.value = t.reply || '';
    return el('div', { class: 'tkAdmin' }, [reply, el('div', { class: 'row' }, [sel,
      el('button', { class: 'btn small green', type: 'button', text: 'Save', on: { click: function () { B.updateTicket(t.id, { status: sel.value, reply: reply.value.trim() }).then(function () { toast('Saved.'); }, function (er) { toast(say(er)); }); } } }),
      el('button', { class: 'btn small ghost', type: 'button', text: 'Delete', on: { click: function () { if (confirm('Delete this ticket for good?')) B.deleteTicket(t.id).catch(function (er) { toast(say(er)); }); } } })])]);
  }
  $('ticketList').addEventListener('focusout', function () { setTimeout(function () { if (pendingRender) renderTickets(); }, 0); });
  $('tFilters').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return; filter = b.dataset.f;
    document.querySelectorAll('#tFilters .chip').forEach(function (c) { c.classList.toggle('on', c === b); }); renderTickets();
  });
  $('copyTickets').addEventListener('click', function () {
    var open = tickets.filter(function (t) { return t.status !== 'done' && t.status !== 'wontfix'; }), out = ['# Survive Gavin Island - open tickets (' + new Date().toLocaleDateString() + ')', ''];
    [['bug', 'Bugs'], ['idea', 'Ideas'], ['other', 'Other']].forEach(function (g) {
      var rows = open.filter(function (t) { return t.kind === g[0]; }); if (!rows.length) return; out.push('## ' + g[1]);
      rows.forEach(function (t) { out.push('- [' + t.status + '] ' + t.title + ' (by ' + t.name + ')'); t.body.split('\n').forEach(function (l) { if (l.trim()) out.push('    ' + l.trim()); }); if (t.reply) out.push('    Reply: ' + t.reply); }); out.push('');
    });
    var text = out.join('\n'), msg = $('copyMsg');
    function done() { msg.textContent = 'Copied ' + open.length + ' tickets.'; setTimeout(function () { msg.textContent = ''; }, 3000); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    else { fallbackCopy(text); done(); }
  });
  function fallbackCopy(t) { var a = el('textarea', { style: 'position:fixed;left:-999px' }); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) { /* ignore */ } a.remove(); }

  function compress(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var max = 1100, s = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        var q = 0.8, d = c.toDataURL('image/jpeg', q);
        while (d.length > 280000 && q > 0.3) { q -= 0.1; d = c.toDataURL('image/jpeg', q); }
        if (d.length > 280000) { var c2 = document.createElement('canvas'); c2.width = Math.round(c.width / 2); c2.height = Math.round(c.height / 2); c2.getContext('2d').drawImage(c, 0, 0, c2.width, c2.height); d = c2.toDataURL('image/jpeg', 0.6); }
        d.length > 290000 ? reject(new Error('big')) : resolve(d);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('bad')); };
      img.src = url;
    });
  }
  $('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('tErr'), btn = $('tSend'), title = $('tTitle').value.trim(), body = $('tBody').value.trim(), file = $('tShot').files[0];
    err.textContent = '';
    if (!user) { openChat(); return; }
    if (title.length < 3 || body.length < 5) { err.textContent = 'Please add a title and a few words about it.'; return; }
    var c = window.SGI_check(title); if (!c.ok) { err.textContent = c.why; return; }
    c = window.SGI_check(body); if (!c.ok) { err.textContent = c.why; return; }
    btn.disabled = true;
    var shotP = file ? compress(file) : Promise.resolve(null);
    shotP.then(function (shot) { return B.submitTicket({ kind: $('tKind').value, title: title, body: body, shot: shot }); }, function () { throw Object.assign(new Error('Could not read that picture. Try a different one, or send without it.'), { friendly: true }); })
      .then(function () { $('tTitle').value = ''; $('tBody').value = ''; $('tShot').value = ''; toast('Ticket sent. Thank you!'); }, function (er) { err.textContent = say(er); })
      .then(function () { btn.disabled = false; });
  });

  /* ------------------------------------------------------------ staff tools */
  var aTab = 'rep', reports = [], players = [];
  function renderAdmin() {
    var body = $('adminBody'); body.textContent = ''; $('repCount').textContent = reports.length ? '(' + reports.length + ')' : '';
    $('aTabRep').classList.toggle('on', aTab === 'rep'); $('aTabPl').classList.toggle('on', aTab === 'pl');
    if (aTab === 'rep') {
      if (!reports.length) body.appendChild(el('p', { class: 'small', text: 'No reports. All quiet on the island.' }));
      reports.forEach(function (r) {
        body.appendChild(el('div', { class: 'rep' }, [el('b', { text: r.msgName }), ': ' + r.msgText, el('div', { class: 'small', text: ago(r.ts) }), el('div', { class: 'row' }, [
          el('button', { class: 'btn small', type: 'button', text: 'Delete message', on: { click: function () { B.deleteMessage(r.messageId).catch(function () { /* already gone */ }).then(function () { return B.dismissReport(r.id); }); } } }),
          el('button', { class: 'btn small ghost', type: 'button', text: 'Ban player', on: { click: function () { if (confirm('Ban ' + r.msgName + '?')) B.setBanned(r.msgUid, true).then(function () { toast(r.msgName + ' is banned.'); }, function (er) { toast(say(er)); }); } } }),
          el('button', { class: 'btn small ghost', type: 'button', text: 'Dismiss', on: { click: function () { B.dismissReport(r.id); } } })])]));
      });
    } else {
      if (!players.length) body.appendChild(el('p', { class: 'small', text: 'No players yet.' }));
      players.forEach(function (p) {
        body.appendChild(el('div', { class: 'pl' }, [el('span', { text: p.name + (p.banned ? ' (banned)' : '') }),
          el('button', { class: 'btn small ghost', type: 'button', text: p.banned ? 'Unban' : 'Ban', on: { click: function () { B.setBanned(p.uid, !p.banned).catch(function (er) { toast(say(er)); }); } } })]));
      });
    }
  }
  $('adminBtn').addEventListener('click', function () { $('adminModal').hidden = false; renderAdmin(); });
  $('adminClose').addEventListener('click', function () { $('adminModal').hidden = true; });
  $('adminModal').addEventListener('click', function (e) { if (e.target === this) this.hidden = true; });
  $('aTabRep').addEventListener('click', function () { aTab = 'rep'; renderAdmin(); });
  $('aTabPl').addEventListener('click', function () { aTab = 'pl'; renderAdmin(); });

  /* ------------------------------------------------------------ auth state */
  function stopAll() { unsubs.forEach(function (u) { try { u(); } catch (e) { /* ignore */ } }); unsubs = []; msgs = []; tickets = []; reports = []; players = []; lastCount = null; }
  B.onUser(function (u) {
    stopAll(); user = u; openTickets = {};
    var signed = !!(u && u.name);
    if (!signed) setMode('in');
    $('chatAuth').hidden = signed; $('chatMain').hidden = !signed; $('outBtn').hidden = !signed;
    $('adminBtn').hidden = !(signed && u.isAdmin);
    $('chatWho').textContent = signed ? 'Signed in as ' + u.name + (u.isAdmin ? ' (staff)' : '') : 'Sign in to chat';
    $('ticketGate').hidden = signed; $('ticketFields').disabled = !signed || !!(u && u.banned);
    if (signed && u.banned) { $('mText').disabled = true; $('mText').placeholder = 'Your chat is turned off.'; } else { $('mText').disabled = false; $('mText').placeholder = 'Say something nice...'; }
    if (signed) {
      unsubs.push(B.watchMessages(onMessages, function (er) { $('mErr').textContent = say(er); }));
      unsubs.push(B.watchTickets(function (l) { tickets = l; renderTickets(); }, function (er) { $('boardMsg').textContent = say(er); }));
      if (u.isAdmin) {
        unsubs.push(B.watchReports(function (l) { reports = l; if (!$('adminModal').hidden) renderAdmin(); else $('repCount').textContent = l.length ? '(' + l.length + ')' : ''; if (l.length) $('adminBtn').title = l.length + ' open reports'; }));
        unsubs.push(B.watchUsers(function (l) { players = l; if (!$('adminModal').hidden) renderAdmin(); }));
      }
    }
    renderMsgs(); renderTickets();
    if (signed && chatOpen()) $('mText').focus({ preventScroll: true });
  });
  window.__sgi = { backend: B };
})();

/* Family-safe text checks. This runs in the browser, so it keeps honest people honest;
   the database rules (firestore.rules) are the part nobody can switch off. */
(function () {
  'use strict';
  // strong words are also caught when spaced or punctuated out (f.u.c.k); the rest only as whole words
  // STRONG words are caught even inside other words or spaced out (f.u.c.k); WORDS only as whole words
  var STRONG = ['fuck', 'shit', 'bitch', 'cunt', 'whore', 'slut', 'nigg', 'fagg', 'retard'];
  var WORDS = ['ass', 'asshole', 'dick', 'porn', 'rape', 'rapist', 'nazi', 'hitler', 'damn', 'crap', 'piss', 'cock', 'tits', 'boob', 'boobs', 'sex', 'sexy', 'nude', 'naked', 'horny', 'kys', 'stfu', 'wtf', 'fck', 'fuk', 'bastard', 'pussy', 'dumbass', 'jerkoff', 'wanker', 'twat', 'prick', 'dyke', 'tranny', 'spic', 'chink', 'kike', 'coon', 'suicide', 'drugs', 'weed', 'cocaine', 'vape', 'beer', 'drunk'];
  var LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '+': 't' };
  function unleet(t) { return String(t).toLowerCase().replace(/[013457@$!+]/g, function (c) { return LEET[c]; }); }
  function words(t) { return unleet(t).replace(/[^a-z]+/g, ' ').trim().split(' ').filter(Boolean); }
  function hasStrong(str) { str = str.replace(/(.)\1+/g, '$1'); for (var i = 0; i < STRONG.length; i++) if (str.indexOf(STRONG[i].replace(/(.)\1+/g, '$1')) >= 0) return true; return false; }
  function bad(text) {
    var i, ws = words(text);
    for (i = 0; i < ws.length; i++) {
      var w = ws[i].replace(/(.)\1{2,}/g, '$1$1');
      if (WORDS.indexOf(w) >= 0 || WORDS.indexOf(w.replace(/(.)\1+/g, '$1')) >= 0) return true;
      if (hasStrong(ws[i])) return true;
    }
    // each space-separated chunk with its punctuation removed (f.u.c.k, f_u_c_k)
    var chunks = unleet(text).split(/\s+/);
    for (i = 0; i < chunks.length; i++) if (hasStrong(chunks[i].replace(/[^a-z]/g, ''))) return true;
    // runs of single letters typed with spaces (f u c k)
    var run = '';
    for (i = 0; i <= ws.length; i++) {
      if (i < ws.length && ws[i].length === 1) run += ws[i];
      else { if (run.length >= 3 && hasStrong(run)) return true; run = ''; }
    }
    return false;
  }
  var HINTS = [
    [/\b\d{3}[\s.\-]?\d{3}[\s.\-]?\d{4}\b/, 'Please don’t share phone numbers.'],
    [/\d[\s.\-]*\d[\s.\-]*\d[\s.\-]*\d[\s.\-]*\d[\s.\-]*\d[\s.\-]*\d/, 'Please don’t share long numbers.'],
    [/\b(my|our)\s+(home\s+)?address\b|\bi\s+live\s+(at|on)\b|\bmy\s+(phone|number|email|school)\s+(is|name)\b/i, 'Keep private things private: no addresses, phone numbers or schools.'],
    [/\b(snap|snapchat|insta|instagram|discord|tiktok|whatsapp|telegram|kik|skype)\b/i, 'Please keep chat on the island. No other apps or accounts.']
  ];
  window.SGI_check = function (text) {
    text = String(text || '').trim();
    if (!text) return { ok: false, why: '' };
    if (window.SGI_hasLink && window.SGI_hasLink(text)) return { ok: false, why: 'Web links aren’t allowed here.' };
    for (var i = 0; i < HINTS.length; i++) if (HINTS[i][0].test(text)) return { ok: false, why: HINTS[i][1] };
    if (bad(text)) return { ok: false, why: 'Please keep it friendly: that message has a word we don’t allow.' };
    return { ok: true };
  };
  var RESERVED = ['admin', 'administrator', 'moderator', 'mod', 'staff', 'support', 'system', 'owner', 'official', 'gavin', 'dad', 'jerry'];
  window.SGI_checkName = function (name) {
    var n = String(name || '');
    if (RESERVED.indexOf(n.toLowerCase()) >= 0 && !window.SGI_ALLOW_RESERVED) return { ok: false, why: 'That name is saved for the team. Pick another.' };
    if (bad(n.replace(/_/g, ' ')) || bad(n)) return { ok: false, why: 'Please pick a friendly name.' };
    return { ok: true };
  };
  /* emoticons -> emoji (only ones that show on Windows 10 and 11, Android, iPhone and Mac) */
  var EMO = [[':)', '\u{1F642}'], [':-)', '\u{1F642}'], [':D', '\u{1F600}'], [':-D', '\u{1F600}'], ['xD', '\u{1F606}'], ['XD', '\u{1F606}'], [':(', '\u{1F641}'], [':-(', '\u{1F641}'], [':\'(', '\u{1F622}'], [';)', '\u{1F609}'], [';-)', '\u{1F609}'], [':P', '\u{1F61B}'], [':p', '\u{1F61B}'], [':O', '\u{1F62E}'], [':o', '\u{1F62E}'], ['B)', '\u{1F60E}'], ['<3', '❤️'], [':*', '\u{1F618}'], ['>:(', '\u{1F620}']];
  window.SGI_emoticons = function (text) {
    return String(text).replace(/(^|\s)(\S{2,3})(?=\s|$)/g, function (m, pre, tok) {
      for (var i = 0; i < EMO.length; i++) if (EMO[i][0] === tok) return pre + EMO[i][1];
      return m;
    });
  };
  window.SGI_EMOJI = ['\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F642}', '\u{1F60A}', '\u{1F60D}', '\u{1F60E}', '\u{1F61B}', '\u{1F609}', '\u{1F62E}', '\u{1F622}', '\u{1F62D}', '\u{1F620}', '\u{1F634}', '\u{1F914}', '\u{1F60B}',
    '\u{1F44D}', '\u{1F44E}', '\u{1F44F}', '\u{1F64C}', '\u{1F4AA}', '\u{1F389}', '❤️', '\u{1F499}', '\u{1F49A}', '\u{1F49B}', '⭐', '\u{1F31F}', '\u{1F525}', '\u{1F48E}', '\u{1F451}', '\u{1F3C6}',
    '⛏️', '\u{1F5E1}️', '\u{1F3F9}', '\u{1F6E1}️', '\u{1F3DD}️', '\u{1F334}', '\u{1F332}', '\u{1F3E0}', '\u{1F6AA}', '\u{1F319}', '☀️', '⚡', '❄️', '\u{1F327}️', '\u{1F3AE}', '\u{1F480}',
    '\u{1F404}', '\u{1F416}', '\u{1F98C}', '\u{1F422}', '\u{1F980}', '\u{1F438}', '\u{1F414}', '\u{1F426}', '\u{1F43A}', '\u{1F436}', '\u{1F431}', '\u{1F34E}', '\u{1F356}', '\u{1F47B}', '\u{1F4A9}', '\u{1F44B}'];
})();

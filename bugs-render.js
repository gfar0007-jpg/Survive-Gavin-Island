/* Builds one bug story as a DOM element. Used by the game and by the website (no innerHTML, so all text is safe). */
function bugEl(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function bugAdd(parent, tag, cls, text) { var e = bugEl(tag, cls, text); parent.appendChild(e); return e; }
function bugList(parent, tag, items, cls) { var l = bugAdd(parent, tag, cls); items.forEach(function (t) { bugAdd(l, 'li', null, t); }); return l; }
function renderBugStory(s) {
  var card = bugEl('article', 'bs bs-fix');
  var head = bugAdd(card, 'div', 'bs-head');
  bugAdd(head, 'span', 'bs-badge', 'Fix');
  bugAdd(head, 'span', 'bs-ver', 'v' + s.ver + (s.date ? '  |  ' + s.date : ''));
  bugAdd(card, 'p', 'bs-found', s.found);
  bugAdd(card, 'p', 'bs-verdict', 'Fix: ' + s.fix);
  return card;
}

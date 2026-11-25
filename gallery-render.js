/* Renders the Then and now tabs from window.SGI_GALLERY (gallery-data.js). Plain DOM, no libraries. */
(function () {
  function el(tag, attrs, kids) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function pic(p, badge) {
    return el('figure', { class: 'galFig' }, [
      el('span', { class: 'galBadge ' + badge, text: badge === 'then' ? 'Early' : 'Now' }),
      el('img', { src: p.src, alt: p.alt || '', loading: 'lazy' }),
      el('figcaption', { text: p.when || '' })
    ]);
  }
  function render() {
    var data = window.SGI_GALLERY || [], tabs = document.getElementById('galTabs'), pane = document.getElementById('galPane');
    if (!tabs || !pane || !data.length) return;
    function show(i) {
      var g = data[i]; pane.innerHTML = '';
      Array.prototype.forEach.call(tabs.children, function (b, j) { b.className = 'tab' + (j === i ? ' on' : ''); b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
      pane.appendChild(el('p', { class: 'galIntro', text: g.intro }));
      (g.items || []).forEach(function (it) {
        var pair = el('div', { class: 'galPair' + (it.then && it.now ? '' : ' single') }, [it.then ? pic(it.then, 'then') : null, it.now ? pic(it.now, 'now') : null]);
        pane.appendChild(el('article', { class: 'galCard' }, [el('h3', { text: it.title }), el('p', { text: it.text }), pair]));
      });
      if (g.strip) {
        var row = el('div', { class: 'galStrip' }, g.strip.steps.map(function (s, n) {
          return el('figure', { class: 'galStep' }, [el('img', { src: s.src, alt: s.cap, loading: 'lazy' }), el('figcaption', { text: (n + 1) + '. ' + s.cap })]);
        }));
        pane.appendChild(el('article', { class: 'galCard' }, [el('h3', { text: g.strip.title }), el('p', { text: g.strip.text }), row]));
      }
      if (g.people) {
        pane.appendChild(el('div', { class: 'galPeople' }, g.people.map(function (p) {
          return el('figure', { class: 'galPerson' }, [el('img', { src: p.src, alt: p.name, loading: 'lazy' }), el('figcaption', { text: p.name })]);
        })));
      }
    }
    data.forEach(function (g, i) { var b = el('button', { type: 'button', role: 'tab', class: 'tab', text: g.tab }); b.addEventListener('click', function () { show(i); }); tabs.appendChild(b); });
    show(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();

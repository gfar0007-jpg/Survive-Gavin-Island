/* Interactive star field: stars sit at different depths, drift slowly, twinkle, and slide with the mouse (or finger) and with scrolling.
   Nearby stars glow when the pointer passes. Pauses when the tab is hidden; holds still if the visitor prefers reduced motion. */
(function () {
  'use strict';
  var c = document.getElementById('stars');
  if (!c || !c.getContext) return;
  var g = c.getContext('2d'), W = 0, H = 0, dpr = 1, stars = [], shoot = null, nextShoot = 4;
  var tx = 0, ty = 0, cx = 0, cy = 0, px = -9999, py = -9999, scrollY = window.pageYOffset || 0;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COLORS = ['255,255,255', '255,255,255', '255,240,200', '200,222,255', '255,214,160'];
  var last = 0, running = false, raf = 0;

  function build() {
    var n = Math.max(70, Math.min(230, Math.round(W * H / 6200)));
    stars = [];
    for (var i = 0; i < n; i++) {
      var z = Math.pow(Math.random(), 1.6) * 0.85 + 0.15;           // depth: 0.15 (far) to 1 (near)
      stars.push({ x: Math.random() * W, y: Math.random() * H, z: z, r: 0.5 + z * 1.6, c: COLORS[(Math.random() * COLORS.length) | 0], ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6, a: 0.5 + z * 0.5 });
    }
  }
  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1); W = window.innerWidth; H = window.innerHeight;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0); build(); if (reduce || !running) draw(0);
  }
  function wrap(v, m) { return ((v % m) + m) % m; }

  function draw(t) {
    g.clearRect(0, 0, W, H);
    var i, s, x, y, a, d, near, glow;
    for (i = 0; i < stars.length; i++) {
      s = stars[i];
      x = wrap(s.x - cx * s.z * 46, W);
      y = wrap(s.y - cy * s.z * 30 - scrollY * s.z * 0.12, H);
      a = s.a * (0.65 + 0.35 * Math.sin(t * s.sp + s.ph));
      d = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
      near = d < 130 ? 1 - d / 130 : 0;
      if (near) a = Math.min(1, a + near * 0.6);
      g.fillStyle = 'rgba(' + s.c + ',' + a.toFixed(3) + ')';
      g.beginPath(); g.arc(x, y, s.r * (1 + near * 0.9), 0, 6.2832); g.fill();
      if (s.r > 1.35 || near > 0.35) {                                  // soft glow on big or touched stars
        glow = s.r * (3 + near * 4);
        g.fillStyle = 'rgba(' + s.c + ',' + (a * 0.16).toFixed(3) + ')';
        g.beginPath(); g.arc(x, y, glow, 0, 6.2832); g.fill();
      }
    }
    if (shoot) {
      var k = shoot.t / shoot.life, hx = shoot.x + shoot.vx * shoot.t, hy = shoot.y + shoot.vy * shoot.t;
      var grd = g.createLinearGradient(hx, hy, hx - shoot.vx * 0.22, hy - shoot.vy * 0.22);
      grd.addColorStop(0, 'rgba(255,255,255,' + (0.9 * (1 - k)).toFixed(3) + ')'); grd.addColorStop(1, 'rgba(255,255,255,0)');
      g.strokeStyle = grd; g.lineWidth = 2; g.lineCap = 'round';
      g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx - shoot.vx * 0.22, hy - shoot.vy * 0.22); g.stroke();
    }
  }
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    var ease = 1 - Math.exp(-dt * 4.5);
    cx += (tx - cx) * ease; cy += (ty - cy) * ease;
    for (var i = 0; i < stars.length; i++) { var s = stars[i]; s.x += dt * 4 * s.z; }   // slow drift to the right
    nextShoot -= dt;
    if (!shoot && nextShoot <= 0) { var ang = 0.35 + Math.random() * 0.3; shoot = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.35, vx: Math.cos(ang) * 900, vy: Math.sin(ang) * 900, t: 0, life: 0.7 }; nextShoot = 7 + Math.random() * 9; }
    if (shoot) { shoot.t += dt; if (shoot.t > shoot.life) shoot = null; }
    draw(now / 1000);
    raf = requestAnimationFrame(frame);
  }
  function start() { if (running || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  window.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; tx = (e.clientX / W - 0.5) * 2; ty = (e.clientY / H - 0.5) * 2; if (reduce) { cx = tx; cy = ty; draw(0); } }, { passive: true });
  window.addEventListener('pointerleave', function () { px = py = -9999; tx = ty = 0; });
  document.addEventListener('mouseleave', function () { px = py = -9999; });
  window.addEventListener('scroll', function () { scrollY = window.pageYOffset || 0; if (reduce) draw(0); }, { passive: true });
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  resize(); start();
  window.__stars = { count: function () { return stars.length; }, running: function () { return running; }, offset: function () { return [cx, cy]; } };
})();

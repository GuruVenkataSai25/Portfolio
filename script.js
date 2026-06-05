/* ══════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════ */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-item, .cert-item, .contact-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width   = '56px';
    ring.style.height  = '56px';
    ring.style.opacity = '.35';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width   = '36px';
    ring.style.height  = '36px';
    ring.style.opacity = '.6';
  });
});

/* ══════════════════════════════════
   STAR CONSTELLATION CANVAS
══════════════════════════════════ */
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let W, H, stars = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 160; i++) {
  stars.push({
    x:  Math.random() * 2000,
    y:  Math.random() * 1200,
    r:  Math.random() * .9 + .2,
    a:  Math.random(),
    da: (.002 + Math.random() * .005) * (Math.random() < .5 ? 1 : -1),
    vx: (Math.random() - .5) * .08,
    vy: (Math.random() - .5) * .04
  });
}

function drawStars() {
  ctx.clearRect(0, 0, W, H);

  stars.forEach(s => {
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
    if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
    s.a += s.da;
    if (s.a < 0 || s.a > 1) s.da *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201,168,76,${s.a * .45})`;
    ctx.fill();
  });

  // Constellation lines
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx   = stars[i].x - stars[j].x;
      const dy   = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(201,168,76,${.06 * (1 - dist / 90)})`;
        ctx.lineWidth   = .4;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawStars);
}
drawStars();

/* ══════════════════════════════════
   TYPEWRITER
══════════════════════════════════ */
const phrases = [
  'crafting beautiful UIs',
  'building for the web',
  'learning every single day',
  'ready for an internship',
  'passionate about code'
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const p = phrases[pi];
  if (!deleting) { tw.textContent = p.slice(0, ++ci); }
  else           { tw.textContent = p.slice(0, --ci); }

  if (!deleting && ci === p.length) {
    setTimeout(() => { deleting = true; }, 2000);
    setTimeout(type, 2100);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

/* ══════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════ */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ══════════════════════════════════
   SKILL BAR ANIMATION
══════════════════════════════════ */
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animate'));
    }
  });
}, { threshold: .2 });

document.querySelectorAll('#skills').forEach(s => so.observe(s));
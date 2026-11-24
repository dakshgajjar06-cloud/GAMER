'use strict';
/* ===== EDIT ME: replace titles, links and thumbnails (thumb: 'assets/thumb1.jpg') ===== */
const YT = 'https://youtube.com/@lxdaksh12';
const VIDEOS = [
  { title: 'Featured video title (placeholder)', meta: 'Replace link and title', url: YT, thumb: '' },
  { title: 'Gameplay video 2 (placeholder)', meta: 'Free Fire MAX', url: YT, thumb: '' },
  { title: 'Gameplay video 3 (placeholder)', meta: 'Valorant', url: YT, thumb: '' },
];
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ===== EDIT ME: game library. Art goes in assets/games/<img>. p = pc | mobile | ps | xbox ===== */
const GAMES = [
  { t:'FREE FIRE MAX', g:'Battle Royale', d:'Fast drops, squad tactics and clutch finishes with Alok.', p:['mobile'], img:'free-fire.jpg', c:'#ff7a1a' },
  { t:'GRAND THEFT AUTO VI', g:'Open World', d:'The next cinematic open-world crime chapter.', p:['ps','xbox'], img:'gta6.jpg', c:'#ff3d9a' },
  { t:'GRAND THEFT AUTO V', g:'Open World', d:'Los Santos heists, chaos and online crews.', p:['pc','ps','xbox'], img:'gta5.jpg', c:'#2ecc71' },
  { t:'RED DEAD REDEMPTION 2', g:'Western Adventure', d:'Realistic frontier stories and wild exploration.', p:['pc','ps','xbox'], img:'rdr2.jpg', c:'#d4872a' },
  { t:'VALORANT', g:'Tactical FPS', d:'Precision gunplay, agents and competitive esports.', p:['pc','ps','xbox'], img:'valorant.jpg', c:'#ff253a' },
  { t:'CALL OF DUTY: GHOSTS', g:'First-Person Shooter', d:'Elite Ghost squad missions and fast multiplayer.', p:['pc','ps','xbox'], img:'cod-ghosts.jpg', c:'#7f8c8d' },
  { t:'CALL OF DUTY: MOBILE', g:'Shooter', d:'Console-style multiplayer and battle royale on mobile.', p:['mobile'], img:'cod-mobile.jpg', c:'#27ae60' },
  { t:'BGMI', g:'Battle Royale', d:'Tactical survival matches and team strategy.', p:['mobile'], img:'bgmi.jpg', c:'#f1c40f' },
  { t:'GOD OF WAR RAGNARÖK', g:'Action Adventure', d:'Epic mythology, brutal boss fights and story.', p:['pc','ps'], img:'god-of-war.jpg', c:'#00c8ff' },
  { t:'COUNTER-STRIKE 2', g:'Tactical FPS', d:'Legendary competitive shooter with sharp aim duels.', p:['pc'], img:'cs2.jpg', c:'#e67e22' },
  { t:'FORTNITE', g:'Battle Royale', d:'Build, fight and survive across a living map.', p:['pc','mobile','ps','xbox'], img:'fortnite.jpg', c:'#8e44ad' },
  { t:'MINECRAFT', g:'Sandbox', d:'Build, explore and survive in endless worlds.', p:['pc','mobile','ps','xbox'], img:'minecraft.jpg', c:'#3cb371' },
];
const PL = { pc:'PC', mobile:'Mobile', ps:'PlayStation', xbox:'Xbox' };
const grid = $('#gamegrid');
grid.innerHTML = GAMES.map(x => `<article class="card" data-p="${x.p.join(' ')}" style="--art:url(assets/games/${x.img});--c:${x.c}"><div><small>${x.g}</small><h3>${x.t}</h3><p>${x.d}</p><ul class="pl">${x.p.map(k => `<li>${PL[k]}</li>`).join('')}</ul><a class="btn red sm" href="${YT}" target="_blank" rel="noopener" aria-label="Explore ${x.t} on YouTube">Explore game</a></div></article>`).join('');
function filt(f) {
  $$('#filters button').forEach(b => b.classList.toggle('on', b.dataset.f === f));
  $$('.card', grid).forEach(c => c.hidden = f !== 'all' && !c.dataset.p.split(' ').includes(f));
}
$$('#filters button').forEach(b => b.onclick = () => filt(b.dataset.f));
$$('[data-go]').forEach(a => a.addEventListener('click', () => filt(a.dataset.go)));

/* Videos */
$('#vids').innerHTML = VIDEOS.map((v, i) => {
  const bg = v.thumb ? `style="background:url('${v.thumb}') center/cover"` : '';
  return `<a class="vid ${i ? '' : 'big'}" href="${v.url}" target="_blank" rel="noopener" ${bg} aria-label="Watch on YouTube: ${v.title}"><span>${v.title}<small>${v.meta}</small></span></a>`;
}).join('');

/* Loader */
const hideLoader = () => $('#loader').classList.add('done');
addEventListener('load', () => setTimeout(hideLoader, 700));
setTimeout(hideLoader, 2500);

/* Nav */
const nav = $('#nav'), burger = $('.burger'), menu = $('#menu'), toTop = $('#top');
const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); };
burger.onclick = () => setMenu(!menu.classList.contains('open'));
$$('#menu a').forEach(a => a.onclick = () => setMenu(false));
addEventListener('scroll', () => { nav.classList.toggle('stuck', scrollY > 30); toTop.classList.toggle('show', scrollY > 600); }, { passive: true });
toTop.onclick = () => scrollTo({ top: 0 });

/* Placeholder social links */
$$('[data-todo]').forEach(a => a.onclick = e => { e.preventDefault(); alert(a.dataset.todo); });


/* Reveal + counters */
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));
$$('[data-count]').forEach(el => {
  const end = +el.dataset.count, s = el.dataset.suffix || '', t0 = performance.now();
  const tick = t => { const p = Math.min((t - t0 - 1000) / 1500, 1); el.textContent = Math.round(end * Math.max(p, 0)) + (p >= 1 ? s : ''); p < 1 && requestAnimationFrame(tick); };
  reduce ? el.textContent = end + s : requestAnimationFrame(tick);
});

/* Cursor */
const cur = $('#cursor');
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  cur.classList.add('on');
  addEventListener('mousemove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
  document.addEventListener('mouseover', e => cur.classList.toggle('hot', !!e.target.closest('a,button')));
}

/* Particles */
if (!reduce) {
  const c = $('#fx'), x = c.getContext('2d'); let w, h;
  const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; }; size(); addEventListener('resize', size);
  const n = innerWidth < 700 ? 25 : 55;
  const ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .4, v: Math.random() * .4 + .1, c: Math.random() > .5 ? '0,200,255' : '255,37,58' }));
  (function loop() {
    x.clearRect(0, 0, w, h);
    ps.forEach(p => { p.y -= p.v; if (p.y < 0) { p.y = h; p.x = Math.random() * w; } x.fillStyle = `rgba(${p.c},.5)`; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.28); x.fill(); });
    requestAnimationFrame(loop);
  })();
}

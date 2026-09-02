// Kertek Doktora — közös szkriptek (minden oldalon betöltve, elemenként védve)

// preloader
(function(){
  var pre = document.getElementById('preloader');
  if (!pre) return;
  var fill = document.getElementById('preloaderFill');
  var count = document.getElementById('preloaderCount');
  var duration = 1100, start = null;
  function step(ts){
    if (start === null) start = ts;
    var progress = Math.min(1, (ts - start) / duration);
    var pct = Math.round(progress * 100);
    if (fill) fill.style.width = pct + '%';
    if (count) count.textContent = pct + '%';
    if (progress < 1) requestAnimationFrame(step);
    else setTimeout(function(){ pre.classList.add('hidden'); }, 180);
  }
  requestAnimationFrame(step);
})();

// évszámláló a hero-jelvényen
(function(){
  var el = document.getElementById('badgeYears');
  if (!el) return;
  var target = parseInt(el.dataset.target || '10', 10);
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { el.textContent = target + '+'; return; }
  var current = 0;
  var timer = setInterval(function(){
    current++; el.textContent = current >= target ? target + '+' : current;
    if (current >= target) clearInterval(timer);
  }, 110);
})();

// finom parallax a hero képen
(function(){
  var frame = document.getElementById('heroImgFrame');
  if (!frame) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  window.addEventListener('scroll', function(){
    var offset = Math.max(-24, Math.min(24, window.scrollY * -0.08));
    frame.style.transform = 'translateY(' + offset + 'px)';
  }, { passive:true });
})();

// navbar stílusváltás görgetéskor (a főoldalon, ahol nincs .subpage)
(function(){
  var nav = document.querySelector('.navbar');
  if (!nav || document.body.classList.contains('subpage')) return;
  function updateNav(){ if (window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
  window.addEventListener('scroll', updateNav, { passive:true });
  updateNav();
})();

// mobil hamburger menü
(function(){
  var nav = document.getElementById('navbar');
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (!burger || !menu || !nav) return;
  function toggle(open){
    var isOpen = open !== undefined ? open : !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    nav.classList.toggle('menu-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  burger.addEventListener('click', function(){ toggle(); });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); });
})();

// referenciák — 3D coverflow körhinta
(function(){
  var cards = Array.prototype.slice.call(document.querySelectorAll('#refsStage .refs-card'));
  if (!cards.length) return;
  var center = 0;
  var isNarrow = window.innerWidth < 700;
  function layout(){
    cards.forEach(function(card, i){
      var offset = i - center, abs = Math.abs(offset);
      var spacing = isNarrow ? 118 : 200;
      var tx = offset * spacing;
      var scale = offset === 0 ? 1 : 0.72;
      var rot = offset === 0 ? 0 : (offset < 0 ? 28 : -28);
      card.classList.toggle('center', offset === 0);
      card.style.transform = 'translateX(' + tx + 'px) scale(' + scale + ') rotateY(' + rot + 'deg)';
      card.style.zIndex = 100 - abs;
      card.style.opacity = abs > 3 ? 0 : 1;
      card.style.filter = offset === 0 ? 'none' : 'brightness(0.62)';
      card.style.pointerEvents = abs > 3 ? 'none' : 'auto';
    });
  }
  function go(dir){ center = Math.max(0, Math.min(cards.length - 1, center + dir)); layout(); }
  var next = document.getElementById('refsNext'), prev = document.getElementById('refsPrev');
  if (next) next.addEventListener('click', function(){ go(1); });
  if (prev) prev.addEventListener('click', function(){ go(-1); });
  cards.forEach(function(card, i){
    card.addEventListener('click', function(){
      if (i === center) { if (card.dataset.href) window.location.href = card.dataset.href; }
      else { center = i; layout(); }
    });
  });
  var startX = null;
  var wrap = document.getElementById('refsWrap');
  if (wrap) {
    wrap.addEventListener('pointerdown', function(e){ startX = e.clientX; });
    wrap.addEventListener('pointerup', function(e){
      if (startX === null) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      startX = null;
    });
  }
  window.addEventListener('resize', function(){ isNarrow = window.innerWidth < 700; layout(); });
  layout();
})();

// galéria lightbox (referenciák oldal)
(function(){
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  if (!items.length) return;
  var box = document.getElementById('lightbox');
  if (!box) return;
  var bImg = box.querySelector('img');
  var bCap = box.querySelector('.lb-cap');
  var closeBtn = box.querySelector('.lb-close');
  function open(src, cap){ bImg.src = src; bCap.textContent = cap || ''; box.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close(){ box.classList.remove('open'); document.body.style.overflow = ''; bImg.removeAttribute('src'); }
  items.forEach(function(it){
    it.addEventListener('click', function(){
      var img = it.querySelector('img');
      var cap = it.querySelector('.g-cap');
      open(img.getAttribute('src'), cap ? cap.textContent : (img.getAttribute('alt') || ''));
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  box.addEventListener('click', function(e){ if (e.target === box) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
})();

// kapcsolati űrlap — mailto
(function(){
  var form = document.getElementById('contactForm');
  if (!form) return;
  var to = form.dataset.email || 'info@kertekdoktora.hu';
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var val = function(id){ var el = document.getElementById(id); return el ? el.value : ''; };
    var name = val('cf-name'), phone = val('cf-phone'), email = val('cf-email'), message = val('cf-message');
    var subject = 'Árajánlatkérés — ' + name;
    var body = 'Név: ' + name + '\nTelefon: ' + phone + '\nE-mail: ' + email + '\n\nÜzenet:\n' + message;
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();

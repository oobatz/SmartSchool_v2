/* ===== Theme / Vision Toggle ===== */
(function() {
  const html = document.documentElement;
  const stored = localStorage.getItem('vision-disabled');
  if (stored === 'true') html.dataset.vision = 'disabled';
})();

function toggleVision() {
  const html = document.documentElement;
  const isDisabled = html.dataset.vision === 'disabled';
  html.dataset.vision = isDisabled ? 'enabled' : 'disabled';
  localStorage.setItem('vision-disabled', String(!isDisabled));
  const btns = document.querySelectorAll('.vision-btn');
  btns.forEach(btn => {
    const icon = btn.querySelector('.vision-icon');
    if (icon) icon.textContent = isDisabled ? '👁' : '👁‍🗨';
  });
}

/* ===== Mobile Menu ===== */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('menu-open-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  if (openBtn) openBtn.style.display = isOpen ? 'block' : 'none';
  if (closeBtn) closeBtn.style.display = isOpen ? 'none' : 'block';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('menu-open-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  if (menu) menu.classList.remove('open');
  if (openBtn) openBtn.style.display = 'block';
  if (closeBtn) closeBtn.style.display = 'none';
}

/* ===== Hero Slider ===== */
function initHeroSlider() {
  const container = document.getElementById('hero-slider');
  if (!container) return;
  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  if (!slides.length) return;

  let current = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  function nextSlide() { current = (current + 1) % slides.length; showSlide(current); }
  function prevSlide() { current = (current - 1 + slides.length) % slides.length; showSlide(current); }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  showSlide(0);
  interval = setInterval(nextSlide, 5000);

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { current = i; showSlide(current); resetInterval(); });
  });
}

/* ===== FAQ Accordion ===== */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        const elAnswer = el.querySelector('.faq-answer');
        const elIcon = el.querySelector('.faq-icon');
        if (elAnswer) elAnswer.style.maxHeight = '0';
        if (elIcon) elIcon.style.transform = 'rotate(0deg)';
      });
      if (!isOpen) {
        item.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ===== Header Scroll ===== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ===== Svedeniya Mobile Select ===== */
function initSvedeniyaSelect() {
  const select = document.getElementById('svedeniya-mobile-select');
  if (select) {
    select.addEventListener('change', function() {
      window.location.href = this.value;
    });
  }
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', function() {
  initHeroSlider();
  initFaqAccordion();
  initHeaderScroll();
  initSvedeniyaSelect();
});

/* ===== Active Nav Highlight ===== */
document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/') {
      if (path === '/' || path === '/index.html') link.classList.add('active');
    } else if (path.startsWith(href)) {
      link.classList.add('active');
    }
  });
});

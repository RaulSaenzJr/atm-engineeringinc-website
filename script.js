// ===== AUTO COPYRIGHT YEAR =====
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ===== KEEP ANCHOR SCROLL CLEAR OF STICKY HEADER =====
const siteHeader = document.querySelector('.site-header');

function setHeaderHeightVar() {
  if (!siteHeader) return;
  document.documentElement.style.setProperty('--header-h', `${siteHeader.offsetHeight + 12}px`);
}

setHeaderHeightVar();
window.addEventListener('resize', setHeaderHeightVar);
window.addEventListener('orientationchange', setHeaderHeightVar);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===== NAV DROPDOWNS (mobile touch toggle) =====
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
const canHover = window.matchMedia('(hover: hover)').matches;

dropdownItems.forEach(item => {
  item.addEventListener('click', function (e) {
    const isLink = e.target.classList.contains('dropdown-link');
    if (isLink || canHover) return;
    e.preventDefault();
    this.classList.toggle('open');
  });
});

document.addEventListener('click', function (e) {
  dropdownItems.forEach(item => {
    if (!item.contains(e.target)) {
      item.classList.remove('open');
    }
  });
});

// ===== PRODUCT CAROUSEL =====
const carousel = document.getElementById('product-carousel');

if (carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to product image ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      startAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.carousel-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAutoplay() {
    clearInterval(timer);
    if (prefersReducedMotion) return;
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  slides[0].classList.add('active');
  dots[0].classList.add('active');

  carousel.querySelector('.carousel-next').addEventListener('click', () => {
    goTo(current + 1);
    startAutoplay();
  });

  carousel.querySelector('.carousel-prev').addEventListener('click', () => {
    goTo(current - 1);
    startAutoplay();
  });

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

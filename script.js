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

// ===== LAND ON THE RIGHT SECTION, THEN ENABLE SMOOTH SCROLLING =====
// scroll-behavior: smooth is great for in-page nav clicks, but it fights the
// browser's own scroll-to-#hash-on-load: that jump gets animated too, and it
// can happen a beat after 'load' (once media/images finish settling into
// their final layout), so it's liable to be interrupted or just miss,
// leaving the page stuck near the top. We force the correct (instant)
// position ourselves once things have settled, then turn smooth scrolling
// on for every later, user-driven navigation.
function landOnHashThenEnableSmoothScroll() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      document.documentElement.classList.add('smooth-scroll');
    });
  });
}

if (document.readyState === 'complete') {
  landOnHashThenEnableSmoothScroll();
} else {
  window.addEventListener('load', landOnHashThenEnableSmoothScroll);
}

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

  if (siteHeader && siteHeader.classList.contains('nav-open') && !siteHeader.contains(e.target)) {
    closeNav();
  }
});

// ===== MOBILE NAV TOGGLE (hamburger) =====
const navToggle = document.querySelector('.nav-toggle');

function closeNav() {
  if (!siteHeader || !navToggle) return;
  siteHeader.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      const isDropdownToggle = link.parentElement.classList.contains('has-dropdown');
      if (isDropdownToggle && !canHover) return;
      closeNav();
    });
  });
}

// ===== AJAX FORMS (Contact, Warranty Registration — stay on site) =====
// Any form with class "contact-form" is wired up the same way. Per-form
// confirmation/error copy can be overridden with data-success-message and
// data-error-message attributes; otherwise the contact form's original text
// is used as the default.
const ajaxForms = document.querySelectorAll('.contact-form');

ajaxForms.forEach((form) => {
  const submitButton = form.querySelector('.form-submit');
  const statusEl = form.querySelector('.form-status');
  if (!submitButton || !statusEl) return;

  const idleText = submitButton.textContent;
  const sendingText = submitButton.dataset.sendingText || 'Sending...';
  const successMessage = form.dataset.successMessage || "Thanks for reaching out — we'll get back to you shortly.";
  const errorMessage = form.dataset.errorMessage || 'Something went wrong. Please email us directly at info@atm-engineeringinc.com.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = sendingText;
    statusEl.textContent = '';
    statusEl.classList.remove('form-status-success', 'form-status-error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        statusEl.textContent = successMessage;
        statusEl.classList.add('form-status-success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      statusEl.textContent = errorMessage;
      statusEl.classList.add('form-status-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = idleText;
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

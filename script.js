// ===== AUTO COPYRIGHT YEAR =====
document.getElementById('footer-year').textContent = new Date().getFullYear();

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

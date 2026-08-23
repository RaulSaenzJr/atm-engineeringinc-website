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

// ===== SERVICES DROPDOWN (mobile touch toggle) =====
const dropdownItem = document.querySelector('.nav-item.has-dropdown');

dropdownItem.addEventListener('click', function (e) {
  const isLink = e.target.classList.contains('dropdown-link');
  if (!isLink) {
    e.preventDefault();
    this.classList.toggle('open');
  }
});

document.addEventListener('click', function (e) {
  if (!dropdownItem.contains(e.target)) {
    dropdownItem.classList.remove('open');
  }
});

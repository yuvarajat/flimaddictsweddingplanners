const menuToggle = document.querySelector('.menu-toggle');
const headerLinks = document.getElementById('header-links');
const mobileMenu = window.matchMedia('(max-width: 43rem)');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') === 'false');
});

headerLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.querySelector('.site-header').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileMenu.addEventListener('change', () => setMenuOpen(false));
menuToggle.hidden = false;

const eventForm = document.getElementById('event-form');
const serviceField = document.getElementById('service');
const messageField = document.getElementById('whatsapp-message');

for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => {
    serviceField.value = link.dataset.service;
  });
}

eventForm.addEventListener('submit', () => {
  const details = [
    ['Service', serviceField.value],
    ['Date', document.getElementById('event-date').value],
    ['Venue or area', document.getElementById('venue').value.trim()],
    ['Wedding details', document.getElementById('ideas').value.trim()],
  ];
  const lines = details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);

  messageField.value = [
    'Hello FilmAddicts, I’d like to enquire about my wedding.',
    '',
    ...lines,
  ].join('\n');
});

eventForm.hidden = false;

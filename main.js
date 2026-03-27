/* ===========================
   ADERA HOLDINGS — SCRIPTS
   =========================== */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Mobile menu toggle ---
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), Math.max(0, delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });

// --- Form submit ---
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
  }, 1200);
}

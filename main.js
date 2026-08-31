/* ===========================
   ADERA HOLDINGS — SCRIPTS
   =========================== */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// --- Mobile menu toggle ---
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    if (links) links.classList.remove('open');
  });
});

// --- Active nav link based on current page ---
(function setActiveNav() {
  const pathname = window.location.pathname;
  // Strip trailing slash, query string, then get filename
  const page = pathname.replace(/\/$/, '').split('/').pop().split('?')[0] || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
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

// --- Cookie Consent Banner ---
(function initCookieBanner() {
  if (localStorage.getItem('adera_cookie_consent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__text">
        <p>We use cookies to improve your experience and analyse site usage. By clicking <strong>Accept All</strong>, you consent to our use of cookies. You can manage your preferences at any time. See our <a href="privacy.html">Privacy Policy</a> for details.</p>
      </div>
      <div class="cookie-banner__actions">
        <button class="cookie-banner__decline" id="cookieDecline">Decline</button>
        <button class="cookie-banner__accept" id="cookieAccept">Accept All</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  // Animate in after short delay
  setTimeout(() => banner.classList.add('cookie-banner--visible'), 400);

  function dismiss(choice) {
    localStorage.setItem('adera_cookie_consent', choice);
    banner.classList.remove('cookie-banner--visible');
    setTimeout(() => banner.remove(), 400);
  }

  document.getElementById('cookieAccept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookieDecline').addEventListener('click', () => dismiss('declined'));
})();

// --- Deter casual image saving (logo, team photos) ---
// Note: this only stops right-click "Save Image As" / drag-out; it does not
// prevent scraping, view-source, or dedicated download tools.
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

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
    if (success) {
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }
  }, 1200);
}

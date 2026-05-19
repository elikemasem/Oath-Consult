/* =============================================
   OATH CONSULT – MAIN JAVASCRIPT
   ============================================= */

// ── Hamburger Menu ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
}

// ── Navbar Scroll Effect ─────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(13,13,13,0.98)';
      navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
    } else {
      navbar.style.background = 'rgba(13,13,13,0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ── Scroll Reveal ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to animatable elements
const animatables = [
  '.service-card', '.value-item', '.svc-block', '.consult-card', '.dev-card',
  '.module-card', '.industry-card', '.value-card', '.vm-card', '.info-card'
];
animatables.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 60}ms`;
    revealObserver.observe(el);
  });
});

// Section headers reveal
document.querySelectorAll('.section-header, .about-text, .about-visual, .solution-intro > div').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Contact Form ─────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      if (msg) {
        msg.textContent = "Thank you! We'll get back to you within 24 hours.";
        msg.style.color = '#22c55e';
      }
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        if (msg) msg.textContent = '';
      }, 5000);
    }, 1500);
  });
}

// ── Stat Counter Animation ───────────────────
function animateNumber(el, target, suffix) {
  let start = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsEl = document.querySelector('.stats');
if (statsEl) {
  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(el => {
        const raw = el.textContent.trim();
        const num = parseInt(raw);
        const suffix = raw.replace(num, '');
        animateNumber(el, num, suffix);
      });
      statObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statObserver.observe(statsEl);
}

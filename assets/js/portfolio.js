/* =========================================
   Jonathan Moya — Portfolio JS
   ========================================= */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---- Mobile menu toggle ---- */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ---- Reveal on scroll ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ---- Typing animation ---- */
const titles = [
  'Software Engineer Experience Consultant',
  'Fundador de Jokadra',
  'Java & Quarkus Specialist',
  'Flutter Developer',
  'Venture Builder · Santiago, Chile',
];
let titleIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  if (!typingEl) return;
  const current = titles[titleIdx];
  if (isDeleting) {
    charIdx--;
    typingEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) { isDeleting = false; titleIdx = (titleIdx + 1) % titles.length; }
    setTimeout(typeLoop, 50);
  } else {
    charIdx++;
    typingEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) { isDeleting = true; setTimeout(typeLoop, 2000); }
    else { setTimeout(typeLoop, 75); }
  }
}
typeLoop();

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));

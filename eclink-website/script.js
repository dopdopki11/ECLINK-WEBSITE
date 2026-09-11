const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menu?.addEventListener('click', () => {
  const opened = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', opened);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

const heroVideo = document.querySelector('.hero-video');
heroVideo?.play().catch(() => {});

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector('#contact-form');
const serviceField = contactForm?.querySelector('[name="service"]');
const selectedService = new URLSearchParams(window.location.search).get('service');

if (selectedService && serviceField) serviceField.value = selectedService;

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const subject = `${form.get('service')} enquiry from ${form.get('name')}`;
  const message = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nInterest: ${form.get('service')}\n\nProject details:\n${form.get('message')}`;
  const status = contactForm.querySelector('.form-status');
  window.location.href = `mailto:inquiries@ec-linkph.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  if (status) status.textContent = 'Your email app is opening with your inquiry ready to send.';
});

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slider-dots button')];
let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeSlide));
}

document.querySelector('.slider-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.slider-next')?.addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
if (slides.length > 1) window.setInterval(() => showSlide(activeSlide + 1), 6500);

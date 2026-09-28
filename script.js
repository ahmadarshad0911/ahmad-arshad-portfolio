const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.addEventListener('mousemove', (event) => {
    const rect = project.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 3;
    const art = project.querySelector('.project-art');
    if (art) art.style.transform = `rotate(${x}deg) translateY(-4px)`;
  });
  project.addEventListener('mouseleave', () => {
    const art = project.querySelector('.project-art');
    if (art) art.style.transform = '';
  });
});

const reveal = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.project, .about-grid, .stack-list').forEach((item) => reveal.observe(item));

const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-progress', `${value}%`);
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('.section-nav a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => {
  sectionObserver.observe(section);
});

const menuToggle = document.querySelector('.menu-toggle');
const sectionMenu = document.querySelector('.section-nav');
if (menuToggle && sectionMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    sectionMenu.classList.toggle('is-open', !expanded);
  });
  navLinks.forEach((link) => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    sectionMenu.classList.remove('is-open');
  }));
}

const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.addEventListener('mousemove', (event) => {
    const rect = project.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 3;
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    const art = project.querySelector('.project-art');
    project.style.setProperty('--spotlight-x', `${xPercent}%`);
    project.style.setProperty('--spotlight-y', `${yPercent}%`);
    project.style.setProperty('--card-tilt', `${x}deg`);
    if (art) art.style.transform = `rotate(${x}deg) translateY(-8px) scale(1.015)`;
  });
  project.addEventListener('mouseleave', () => {
    const art = project.querySelector('.project-art');
    if (art) art.style.transform = '';
    project.style.removeProperty('--card-tilt');
  });
  const toggle = project.querySelector('.case-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = project.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.firstChild.textContent = expanded ? 'Close field note ' : 'Open field note ';
    });
  }
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
    sections.forEach((section) => section.classList.toggle('is-current', section === target));
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

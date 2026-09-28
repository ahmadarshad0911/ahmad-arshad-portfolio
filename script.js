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

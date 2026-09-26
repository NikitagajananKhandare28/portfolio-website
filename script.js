// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after choosing a link
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀';
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '☾';
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
  }
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

// Project filter
const filterBar = document.getElementById('filterBar');
const projects = document.querySelectorAll('.project');
const filterEmpty = document.getElementById('filterEmpty');

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-chip');
  if (!btn) return;

  filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
  btn.classList.add('is-active');

  const filter = btn.dataset.filter;
  let visibleCount = 0;

  projects.forEach(project => {
    const tags = project.dataset.tags.split(' ');
    const show = filter === 'all' || tags.includes(filter);
    project.hidden = !show;
    if (show) visibleCount++;
  });

  filterEmpty.hidden = visibleCount !== 0;
});

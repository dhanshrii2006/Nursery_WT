function formatNumber(value) {
  return value.toLocaleString(undefined);
}

function animateCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach((el) => {
    const target = Number(el.getAttribute('data-target')) || 0;
    const durationMs = 1400;
    const startTs = performance.now();
    const startVal = 0;
    function tick(now) {
      const progress = Math.min(1, (now - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = formatNumber(value);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function startLiveCount() {
  const el = document.getElementById('live-count');
  if (!el) return;
  let current = Number((el.getAttribute('data-base') || '0'));
  el.textContent = formatNumber(current);
  function bump() {
    // Randomly add rescues for a lively feel
    const increment = Math.random() < 0.7 ? 1 : Math.floor(Math.random() * 4) + 1; // 1–5
    current += increment;
    el.textContent = formatNumber(current);
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 300);
    const nextIn = 1200 + Math.random() * 2400; // 1.2–3.6s
    setTimeout(bump, nextIn);
  }
  setTimeout(bump, 1800);
}

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (!track || !prevBtn || !nextBtn) return;
  const slides = Array.from(track.children);
  let index = 0;
  function show(i) {
    index = (i + slides.length) % slides.length;
    const card = slides[index];
    const cardWidth = card.getBoundingClientRect().width + 16; // 16px gap
    track.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  }
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  let auto = setInterval(() => show(index + 1), 4200);
  track.addEventListener('pointerenter', () => clearInterval(auto));
  track.addEventListener('pointerleave', () => (auto = setInterval(() => show(index + 1), 4200)));
}

function smoothAnchorNav() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64; // account for fixed nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  startLiveCount();
  initCarousel();
  smoothAnchorNav();
});



import './services.scss';

import './services.scss';

// ═══════════════════════════════════════════════════════════════
//  SERVICES — рух на сторінці
//
//  Свідомо мало анімації. Сторінка з цінами — це місце, де людина
//  приймає рішення, і рух тут заважає читати, а не допомагає.
//  Тому лише два моменти:
//    1. Лінія розгалуження — промальовується один раз і показує,
//       що шлях іде далі. Це сенс, а не декор.
//    2. Поява блоків — 16px зсуву, ледь помітно.
// ═══════════════════════════════════════════════════════════════

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ───────────────────────────────────────────────────────────────
// 1. Лінія розгалуження
// ───────────────────────────────────────────────────────────────

function pathInit(path) {
  const fork = path.querySelector('.path__fork');
  if (!fork) return;

  if (prefersReducedMotion()) {
    path.setAttribute('data-fls-path-active', '');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting) return;
      path.setAttribute('data-fls-path-active', '');
      obs.disconnect();
    },
    { threshold: 0.4 }
  );

  observer.observe(fork);
}

// ───────────────────────────────────────────────────────────────
// 2. Поява блоків
// ───────────────────────────────────────────────────────────────
// Приховування вмикається атрибутом на <html>, який ставить сам
// скрипт. Без JS увесь контент лишається видимим.

const REVEAL_TARGETS = [
  '.entry',
  '.branch',
  '.shared',
  '.group-card',
  '.schedule__row',
  '.club__inner',
  '.cta__inner'
];

function revealInit(scope) {
  if (prefersReducedMotion()) return;

  const nodes = scope.querySelectorAll(REVEAL_TARGETS.join(', '));
  if (!nodes.length) return;

  document.documentElement.setAttribute('data-fls-reveal', '');
  nodes.forEach((node) => node.setAttribute('data-fls-reveal-item', ''));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-fls-reveal-visible', '');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
  );

  nodes.forEach((node) => observer.observe(node));
}

// ───────────────────────────────────────────────────────────────

export function servicesInit() {
  const page = document.querySelector('[data-fls-services]');
  if (!page) return;

  const path = page.querySelector('[data-fls-path]');
  if (path) pathInit(path);

  revealInit(page);
}

document.querySelector('[data-fls-services]')
  ? window.addEventListener('load', servicesInit)
  : null;

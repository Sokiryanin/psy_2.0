import './about.scss';

import './about.scss';

import { bodyLockToggle } from '@js/common/functions.js';

// ═══════════════════════════════════════════════════════════════
//  ABOUT — інтерактив сторінки «Про мене»
//  1. Заповнення шкали таймлайну освіти (промальовування при скролі)
//  2. Лайтбокс для атестатів і сертифікатів.
//     Без зовнішніх бібліотек: галерея тут одна, і залежність
//     заради чотирьох картинок не виправдана.
// ═══════════════════════════════════════════════════════════════

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function timelineInit(timelineEls) {
  if (!timelineEls.length) return;

  const timelines = [...timelineEls].map((el) => ({
    el,
    items: [...el.querySelectorAll('.timeline__item')],
  }));

  if (prefersReducedMotion()) {
    timelines.forEach(({ el, items }) => {
      el.style.setProperty('--timeline-fill', 1);
      items.forEach((item) => item.setAttribute('data-fls-timeline-item-active', ''));
    });
    return;
  }

  // Заповнення — це частка висоти таймлайну, яку прокрутили повз
  // умовну лінію читання (65% висоти екрана), а не одноразова
  // анімація: для довгого списку (курси, сертифікати) фіксована за
  // часом анімація добігає кінця задовго до того, як прокрутиться
  // весь вміст. Мітки-кружечки вмикаються тим самим проходом лінії:
  // кожна стає активною, щойно смуга заповнення її наздоганяє.
  const readLine = () => window.innerHeight * 0.65;

  const update = () => {
    const line = readLine();

    timelines.forEach(({ el, items }) => {
      const rect = el.getBoundingClientRect();
      const progress = rect.height ? (line - rect.top) / rect.height : 0;

      el.style.setProperty('--timeline-fill', Math.min(1, Math.max(0, progress)));

      items.forEach((item) => {
        // Центр крапки: відступ 6px + половина її висоти (16px)
        const dotCenter = item.getBoundingClientRect().top + 14;
        item.toggleAttribute('data-fls-timeline-item-active', dotCenter <= line);
      });
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

function certsInit(list) {
  const viewer = document.querySelector('[data-fls-certs-viewer]');
  if (!viewer) return;

  const image = viewer.querySelector('[data-fls-certs-image]');
  const closeBtn = viewer.querySelector('[data-fls-certs-close]');
  if (!image) return;

  // Куди повернути фокус після закриття
  let lastTrigger = null;

  const open = (src, alt, trigger) => {
    lastTrigger = trigger;
    image.src = src;
    image.alt = alt || '';

    viewer.hidden = false;
    // Наступний кадр, щоб спрацював перехід прозорості
    requestAnimationFrame(() => viewer.setAttribute('data-fls-certs-open', ''));

    // delay: 0 — bodyLockToggle без нього на 500мс тримає внутрішній
    // bodyLockStatus у false; якщо закрити лайтбокс швидше, виклик
    // у close() мовчки проігнорується і скролл лишиться заблокованим
    bodyLockToggle(0);
    closeBtn?.focus();
  };

  const close = () => {
    viewer.removeAttribute('data-fls-certs-open');

    const finish = () => {
      viewer.hidden = true;
      image.src = '';
      viewer.removeEventListener('transitionend', finish);
    };

    viewer.addEventListener('transitionend', finish);
    // Страховка, якщо переходи вимкнені
    window.setTimeout(finish, 400);

    bodyLockToggle(0);
    lastTrigger?.focus();
  };

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-fls-cert]');
    if (!btn) return;

    const img = btn.querySelector('img');
    open(btn.dataset.flsCert, img?.alt, btn);
  });

  viewer.addEventListener('click', (e) => {
    // Клік по підкладці або по хрестику
    if (e.target === viewer || e.target.closest('[data-fls-certs-close]')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !viewer.hidden) close();
  });
}

export function aboutInit() {
  const page = document.querySelector('[data-fls-about]');
  if (!page) return;

  timelineInit(page.querySelectorAll('[data-fls-timeline]'));

  const certs = page.querySelector('[data-fls-certs]');
  if (certs) certsInit(certs);
}

document.querySelector('[data-fls-about]')
  ? window.addEventListener('load', aboutInit)
  : null;

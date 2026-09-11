import './webinars.scss';

import './webinars.scss';

import { bodyLockStatus, bodyLockToggle } from '@js/common/functions.js';

// ═══════════════════════════════════════════════════════════════
//  WEBINARS — перегляд відео без виходу зі сторінки
//
//  Progressive enhancement. Кожна картка — звичайне посилання на
//  відео в атрибуті href. Якщо JS не відпрацював або в атрибуті
//  data-fls-webinar-video немає id, людина просто переходить за
//  посиланням. Якщо id є — відкривається модальне вікно.
//
//  Формат id: те, що йде після v= у посиланні YouTube.
//  Наприклад для https://youtu.be/dQw4w9WgXcQ це dQw4w9WgXcQ.
// ═══════════════════════════════════════════════════════════════

function videoInit(page) {
  const modal = page.querySelector('[data-fls-video-modal]');
  const slot = modal?.querySelector('[data-fls-video-slot]');
  const closeBtn = modal?.querySelector('[data-fls-video-close]');
  if (!modal || !slot) return;

  let lastTrigger = null;

  const open = (videoId, trigger) => {
    lastTrigger = trigger;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = trigger.getAttribute('aria-label') || 'Вебінар';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;

    slot.replaceChildren(iframe);

    modal.hidden = false;
    requestAnimationFrame(() => modal.setAttribute('data-fls-video-open', ''));

    if (bodyLockStatus) bodyLockToggle();
    closeBtn?.focus();
  };

  const close = () => {
    modal.removeAttribute('data-fls-video-open');

    const finish = () => {
      modal.hidden = true;
      // Обовʼязково: інакше відео продовжить грати за кадром
      slot.replaceChildren();
      modal.removeEventListener('transitionend', finish);
    };

    modal.addEventListener('transitionend', finish);
    window.setTimeout(finish, 400);

    if (bodyLockStatus) bodyLockToggle();
    lastTrigger?.focus();
  };

  page.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-fls-webinar-video]');
    if (!trigger) return;

    const videoId = trigger.dataset.flsWebinarVideo?.trim();
    // Порожній атрибут — лишаємо звичайний перехід за посиланням
    if (!videoId) return;

    e.preventDefault();
    open(videoId, trigger);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-fls-video-close]')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

export function webinarsInit() {
  const page = document.querySelector('[data-fls-webinars]');
  if (!page) return;

  videoInit(page);
}

document.querySelector('[data-fls-webinars]')
  ? window.addEventListener('load', webinarsInit)
  : null;

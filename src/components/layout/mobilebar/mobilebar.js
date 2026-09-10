import './mobilebar.scss';

// ═══════════════════════════════════════════════════════════════
//  MOBILEBAR
//  Панель виїжджає знизу, коли hero пішов з екрана, і ховається,
//  коли видно форму контактів. Сенс: не пропонувати дію двічі
//  одночасно і не перекривати саму форму, до якої вона веде.
// ═══════════════════════════════════════════════════════════════

export function mobilebarInit() {
  const bar = document.querySelector('[data-fls-mobilebar]');
  if (!bar) return;

  const show = () => bar.setAttribute('data-fls-mobilebar-visible', '');
  const hide = () => bar.removeAttribute('data-fls-mobilebar-visible');

  // Орієнтир початку: hero, а якщо його немає — перша секція
  const anchor =
    document.querySelector('.hero') || document.querySelector('main section');

  // Зони, де панель зайва: форма запису й підвал
  const suppressors = document.querySelectorAll('[data-fls-mobilebar-hide]');

  let pastAnchor = !anchor;
  let inSuppressor = false;

  const sync = () => (pastAnchor && !inSuppressor ? show() : hide());

  if (anchor) {
    new IntersectionObserver(
      ([entry]) => {
        pastAnchor = !entry.isIntersecting;
        sync();
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    ).observe(anchor);
  }

  if (suppressors.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.dataset.flsMobilebarSeen = entry.isIntersecting
            ? '1'
            : '';
        });

        inSuppressor = [...suppressors].some(
          (node) => node.dataset.flsMobilebarSeen === '1'
        );
        sync();
      },
      { threshold: 0.15 }
    );

    suppressors.forEach((node) => observer.observe(node));
  }

  sync();
}

document.querySelector('[data-fls-mobilebar]')
  ? window.addEventListener('load', mobilebarInit)
  : null;

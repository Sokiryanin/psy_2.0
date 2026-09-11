import './blog.scss';

import './blog.scss';

// ═══════════════════════════════════════════════════════════════
//  BLOG — фільтр за темами
//
//  Progressive enhancement: блок фільтра має hidden у розмітці,
//  знімає його скрипт. Без JS усі статті видно, а мертвих кнопок
//  на сторінці немає.
//
//  Під CMS: data-category на <li> = category.slug,
//  data-filter на чипі = той самий slug.
// ═══════════════════════════════════════════════════════════════

function plural(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return 'стаття';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'статті';
  return 'статей';
}

function filterInit(root, page) {
  const chips = [...root.querySelectorAll('[data-filter]')];
  const grid = page.querySelector('[data-fls-blog-grid]');
  const counter = root.querySelector('[data-fls-blog-count]');
  const empty = page.querySelector('[data-fls-blog-empty]');
  if (!chips.length || !grid) return;

  const items = [...grid.children];

  const apply = (value) => {
    let shown = 0;

    items.forEach((item) => {
      const match = value === 'all' || item.dataset.category === value;
      item.toggleAttribute('data-filtered-out', !match);
      if (match) shown += 1;
    });

    chips.forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === value));
    });

    if (counter) counter.textContent = `${shown} ${plural(shown)}`;
    if (empty) empty.hidden = shown > 0;
  };

  root.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (!chip) return;
    apply(chip.dataset.filter);
  });

  root.hidden = false;
  apply('all');
}

export function blogInit() {
  const page = document.querySelector('[data-fls-blog]');
  if (!page) return;

  const filter = page.querySelector('[data-fls-blog-filter]');
  if (filter) filterInit(filter, page);
}

document.querySelector('[data-fls-blog]')
  ? window.addEventListener('load', blogInit)
  : null;

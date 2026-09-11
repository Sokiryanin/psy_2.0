import './article.scss';

// ═══════════════════════════════════════════════════════════════
//  BLOG ARTICLE
//    1. Зміст — будується з h2 у тексті
//    2. Прогрес читання
//
//  Обидва блоки мають hidden у розмітці й вмикаються скриптом.
//  Причина: під CMS текст приходить згенерованим, заголовки
//  заздалегідь невідомі, а без JS порожній зміст був би сміттям.
// ═══════════════════════════════════════════════════════════════

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Транслітерація для id: кирилиця в href ламає посилання
// при копіюванні та в деяких поштових клієнтах
const MAP = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ie',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ь: '',
  ю: 'iu',
  я: 'ia',
  "'": '',
  '’': ''
};

function slugify(text, index) {
  const slug = text
    .toLowerCase()
    .split('')
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return slug ? `${slug}` : `section-${index + 1}`;
}

// ───────────────────────────────────────────────────────────────
// 1. Зміст
// ───────────────────────────────────────────────────────────────

function tocInit(nav, content) {
  const headings = [...content.querySelectorAll('h2')];
  // Один розділ — змісту немає сенсу
  if (headings.length < 2) return;

  const list = nav.querySelector('.toc__list');
  if (!list) return;

  const links = headings.map((heading, i) => {
    if (!heading.id) heading.id = slugify(heading.textContent, i);

    const item = document.createElement('li');
    item.className = 'toc__item';

    const link = document.createElement('a');
    link.className = 'toc__link';
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    item.append(link);
    list.append(item);
    return link;
  });

  nav.hidden = false;

  // Підсвічування поточного розділу
  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('toc__link--active', link.hash === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (visible) setActive(visible.target.id);
    },
    // Вузька смуга під хедером: активним стає той заголовок,
    // який щойно проїхав повз неї
    { rootMargin: '-110px 0px -70% 0px', threshold: 0 }
  );

  headings.forEach((heading) => observer.observe(heading));
  setActive(headings[0].id);
}

// ───────────────────────────────────────────────────────────────
// 2. Прогрес читання
// ───────────────────────────────────────────────────────────────

function progressInit(progress, article) {
  if (prefersReducedMotion()) return;

  const bar = progress.querySelector('[data-fls-progress-bar]');
  if (!bar) return;

  progress.hidden = false;

  let ticking = false;

  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const passed = -rect.top;

    const ratio = total <= 0 ? 0 : Math.min(Math.max(passed / total, 0), 1);
    bar.style.width = `${ratio * 100}%`;

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

// ───────────────────────────────────────────────────────────────

export function articleInit() {
  const page = document.querySelector('[data-fls-article]');
  if (!page) return;

  const content = page.querySelector('[data-fls-article-content]');
  const nav = page.querySelector('[data-fls-toc]');
  if (nav && content) tocInit(nav, content);

  const progress = page.querySelector('[data-fls-progress]');
  const article = page.querySelector('.article');
  if (progress && article) progressInit(progress, article);
}

document.querySelector('[data-fls-article]')
  ? window.addEventListener('load', articleInit)
  : null;

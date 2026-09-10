import './home.scss';

// ═══════════════════════════════════════════════════════════════
//  HOME — інтерактив головної сторінки
//  1. FAQ-акордеон       (реакція на дію)
//  2. Таймлайн процесу   (промальовування при скролі)
//  3. Таби «Запити»      (перемикання тем)
//  4. Поява секцій       (м'який reveal)
// ═══════════════════════════════════════════════════════════════

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ───────────────────────────────────────────────────────────────
// 1. FAQ-акордеон
// ───────────────────────────────────────────────────────────────
// Розкриття через grid-template-rows: 0fr → 1fr.
// Не потребує вимірювання scrollHeight і коректно
// переживає зміну ширини екрана.

function faqInit(root) {
  const items = root.querySelectorAll('.faq-item');
  if (!items.length) return;

  const closeItem = (item) => {
    item.classList.remove('faq-item--open');
    item.querySelector('.faq-item__q')?.setAttribute('aria-expanded', 'false');
  };

  const openItem = (item) => {
    item.classList.add('faq-item--open');
    item.querySelector('.faq-item__q')?.setAttribute('aria-expanded', 'true');
  };

  root.addEventListener('click', (e) => {
    const button = e.target.closest('.faq-item__q');
    if (!button || !root.contains(button)) return;

    const item = button.closest('.faq-item');
    if (!item) return;

    const isOpen = item.classList.contains('faq-item--open');

    // Одночасно відкрите лише одне питання
    items.forEach(closeItem);
    if (!isOpen) openItem(item);
  });
}

// ───────────────────────────────────────────────────────────────
// 2. Таймлайн процесу
// ───────────────────────────────────────────────────────────────
// Єдиний навмисний момент руху на сторінці: лінія промальовується
// зверху вниз, маркери підсвічуються по черзі.

function processInit(list) {
  const steps = list.querySelectorAll('.step');
  if (!steps.length) return;

  if (prefersReducedMotion()) {
    list.setAttribute('data-fls-process-active', '');
    steps.forEach((step) => step.setAttribute('data-fls-step-active', ''));
    return;
  }

  // Лінія
  const lineObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        list.setAttribute('data-fls-process-active', '');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  lineObserver.observe(list);

  // Маркери — по черзі, з невеликою затримкою одне за одним
  const stepObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const step = entry.target;
        const index = [...steps].indexOf(step);

        window.setTimeout(
          () => step.setAttribute('data-fls-step-active', ''),
          index * 120
        );

        observer.unobserve(step);
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
  );

  steps.forEach((step) => stepObserver.observe(step));
}

// ───────────────────────────────────────────────────────────────
// 3. Таби блоку «Запити»
// ───────────────────────────────────────────────────────────────
// Progressive enhancement: без JS усі три панелі видимі та йдуть
// одна за одною. Скрипт ставить [data-fls-issues-ready] і лише
// після цього ховає неактивні.

function issuesInit(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  if (tabs.length < 2 || tabs.length !== panels.length) return;

  const activate = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
      panels[i].toggleAttribute('hidden', !selected);
    });

    if (moveFocus) tabs[index].focus();
  };

  root.setAttribute('data-fls-issues-ready', '');
  activate(0);

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    activate(tabs.indexOf(tab));
  });

  // Навігація стрілками — очікувана поведінка для табів
  root.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    const moves = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: tabs.length - 1
    };

    if (!(e.key in moves)) return;
    e.preventDefault();

    const next = (moves[e.key] + tabs.length) % tabs.length;
    activate(next, true);
  });
}

// ───────────────────────────────────────────────────────────────
// 4. Поява секцій
// ───────────────────────────────────────────────────────────────
// Атрибут data-fls-reveal ставиться на <html> самим скриптом.
// Без JS контент лишається видимим — стилі приховування
// прив'язані до цього атрибута.

const REVEAL_TARGETS = [
  '.about__grid',
  '.services__list',
  '.issues__tabs',
  '.faq__list',
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
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  nodes.forEach((node) => observer.observe(node));
}

// ───────────────────────────────────────────────────────────────
// Ініціалізація
// ───────────────────────────────────────────────────────────────

export function homeInit() {
  const page = document.querySelector('[data-fls-home]');
  if (!page) return;

  const faq = page.querySelector('[data-fls-faq]');
  if (faq) faqInit(faq);

  const process = page.querySelector('[data-fls-process]');
  if (process) processInit(process);

  const issues = page.querySelector('[data-fls-issues]');
  if (issues) issuesInit(issues);

  revealInit(page);
}

document.querySelector('[data-fls-home]')
  ? window.addEventListener('load', homeInit)
  : null;

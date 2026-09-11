import './partners.scss';

// ═══════════════════════════════════════════════════════════════
//  PARTNERS — підбір формату під тип партнера
//
//  Шість типів партнерів × чотири формати роботи. Зв'язки не
//  вигадані: вони прямо з опису кожної аудиторії.
//
//  Progressive enhancement: без JS усі шість панелей видимі та
//  йдуть одна за одною. Режим табів вмикається атрибутом
//  [data-fls-matcher-ready] уже після ініціалізації.
// ═══════════════════════════════════════════════════════════════

function matcherInit(root) {
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

    // Перезапуск анімації появи панелі
    const panel = panels[index];
    panel.style.animation = 'none';
    void panel.offsetHeight;
    panel.style.animation = '';

    if (moveFocus) tabs[index].focus();
  };

  root.setAttribute('data-fls-matcher-ready', '');
  activate(0);

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    activate(tabs.indexOf(tab));
  });

  // Вертикальний список — стрілки вгору та вниз,
  // але лівa й права теж працюють, щоб не було сюрпризів
  root.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    const moves = {
      ArrowDown: current + 1,
      ArrowRight: current + 1,
      ArrowUp: current - 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: tabs.length - 1
    };

    if (!(e.key in moves)) return;
    e.preventDefault();
    activate((moves[e.key] + tabs.length) % tabs.length, true);
  });
}

export function partnersInit() {
  const page = document.querySelector('[data-fls-partners]');
  if (!page) return;

  const matcher = page.querySelector('[data-fls-matcher]');
  if (matcher) matcherInit(matcher);
}

document.querySelector('[data-fls-partners]')
  ? window.addEventListener('load', partnersInit)
  : null;

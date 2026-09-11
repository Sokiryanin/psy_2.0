import './contacts.scss';

// ═══════════════════════════════════════════════════════════════
//  CONTACTS
//    1. Список країн і прапори
//    2. Вибір коду країни
//    3. Валідація
//    4. Лічильник символів
//    5. Відправка
//
//  Принципи валідації:
//    • перша перевірка — коли людина йде з поля, не під час набору;
//    • після появи помилки поле перевіряється на кожен ввід,
//      щоб повідомлення зникло одразу після виправлення;
//    • колір не єдиний сигнал: є іконка, текст і aria-invalid;
//    • при відправці фокус їде на перше проблемне поле.
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────
// 1. Країни
// ───────────────────────────────────────────────────────────────
// Прапори — вбудовані SVG, а не емодзі: на Windows емодзі-прапори
// не підтримуються й показуються двома літерами.
// Список можна доповнювати — більше ніде нічого міняти не треба.

const f = {
  hor: (...colors) =>
    colors
      .map(
        (c, i) =>
          `<rect y="${(i * 100) / colors.length}%" width="100%" height="${
            100 / colors.length
          }%" fill="${c}"/>`
      )
      .join(''),
  ver: (...colors) =>
    colors
      .map(
        (c, i) =>
          `<rect x="${(i * 100) / colors.length}%" width="${
            100 / colors.length
          }%" height="100%" fill="${c}"/>`
      )
      .join('')
};

const wrap = (inner) =>
  `<svg viewBox="0 0 22 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const COUNTRIES = [
  {
    code: 'UA',
    name: 'Україна',
    dial: '+380',
    flag: f.hor('#005BBB', '#FFD500')
  },
  { code: 'PL', name: 'Польща', dial: '+48', flag: f.hor('#fff', '#DC143C') },
  {
    code: 'DE',
    name: 'Німеччина',
    dial: '+49',
    flag: f.hor('#000', '#DD0000', '#FFCE00')
  },
  {
    code: 'CZ',
    name: 'Чехія',
    dial: '+420',
    flag:
      f.hor('#fff', '#D7141A') + '<path d="M0 0 11 8 0 16Z" fill="#11457E"/>'
  },
  {
    code: 'SK',
    name: 'Словаччина',
    dial: '+421',
    flag: f.hor('#fff', '#0B4EA2', '#EE1C25')
  },
  {
    code: 'AT',
    name: 'Австрія',
    dial: '+43',
    flag: f.hor('#ED2939', '#fff', '#ED2939')
  },
  {
    code: 'NL',
    name: 'Нідерланди',
    dial: '+31',
    flag: f.hor('#AE1C28', '#fff', '#21468B')
  },
  {
    code: 'IT',
    name: 'Італія',
    dial: '+39',
    flag: f.ver('#008C45', '#fff', '#CD212A')
  },
  {
    code: 'FR',
    name: 'Франція',
    dial: '+33',
    flag: f.ver('#002395', '#fff', '#ED2939')
  },
  {
    code: 'RO',
    name: 'Румунія',
    dial: '+40',
    flag: f.ver('#002B7F', '#FCD116', '#CE1126')
  },
  {
    code: 'IE',
    name: 'Ірландія',
    dial: '+353',
    flag: f.ver('#169B62', '#fff', '#FF883E')
  },
  {
    code: 'PT',
    name: 'Португалія',
    dial: '+351',
    flag: '<rect width="40%" height="100%" fill="#006600"/><rect x="40%" width="60%" height="100%" fill="#FF0000"/>'
  },
  {
    code: 'ES',
    name: 'Іспанія',
    dial: '+34',
    flag: '<rect width="100%" height="100%" fill="#AA151B"/><rect y="25%" width="100%" height="50%" fill="#F1BF00"/>'
  },
  {
    code: 'GB',
    name: 'Велика Британія',
    dial: '+44',
    flag: '<rect width="100%" height="100%" fill="#012169"/><path d="M0 0 22 16M22 0 0 16" stroke="#fff" stroke-width="3"/><path d="M0 0 22 16M22 0 0 16" stroke="#C8102E" stroke-width="1.6"/><path d="M11 0V16M0 8H22" stroke="#fff" stroke-width="5"/><path d="M11 0V16M0 8H22" stroke="#C8102E" stroke-width="3"/>'
  },
  {
    code: 'US',
    name: 'США',
    dial: '+1',
    flag:
      f.hor(
        '#B22234',
        '#fff',
        '#B22234',
        '#fff',
        '#B22234',
        '#fff',
        '#B22234'
      ) + '<rect width="44%" height="56%" fill="#3C3B6E"/>'
  },
  {
    code: 'CA',
    name: 'Канада',
    dial: '+1',
    flag: '<rect width="100%" height="100%" fill="#fff"/><rect width="25%" height="100%" fill="#D80621"/><rect x="75%" width="25%" height="100%" fill="#D80621"/><path d="M11 4 12 7 14 6 13 9 15 9 11 12 7 9 9 9 8 6 10 7Z" fill="#D80621"/>'
  },
  {
    code: 'IL',
    name: 'Ізраїль',
    dial: '+972',
    flag: '<rect width="100%" height="100%" fill="#fff"/><rect y="2" width="100%" height="2" fill="#0038B8"/><rect y="12" width="100%" height="2" fill="#0038B8"/><path d="M11 5.5 13 9.5H9ZM11 10.5 9 6.5H13Z" fill="none" stroke="#0038B8" stroke-width="0.9"/>'
  }
];

// ───────────────────────────────────────────────────────────────
// 2. Вибір коду країни
// ───────────────────────────────────────────────────────────────

function countryInit(root) {
  const toggle = root.querySelector('[data-country-toggle]');
  const list = root.querySelector('[data-country-list]');
  const flagBox = root.querySelector('[data-country-flag]');
  const codeBox = root.querySelector('[data-country-code]');
  const input = root.querySelector('[data-country-input]');
  if (!toggle || !list) return;

  let current = COUNTRIES[0];

  const paint = (country) => {
    current = country;
    flagBox.innerHTML = wrap(country.flag);
    codeBox.textContent = country.dial;
    if (input) input.value = country.dial;

    list.querySelectorAll('[role="option"]').forEach((opt) => {
      opt.setAttribute(
        'aria-selected',
        String(opt.dataset.code === country.code)
      );
    });
  };

  // Наповнюємо список
  COUNTRIES.forEach((country) => {
    const item = document.createElement('li');
    item.className = 'country__option';
    item.setAttribute('role', 'option');
    item.setAttribute('tabindex', '-1');
    item.dataset.code = country.code;
    item.dataset.dial = country.dial;
    item.innerHTML = `
      <span class="country__flag">${wrap(country.flag)}</span>
      <span class="country__name">${country.name}</span>
      <span class="country__dial">${country.dial}</span>`;
    list.append(item);
  });

  paint(current);

  const open = () => {
    list.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    const selected = list.querySelector('[aria-selected="true"]');
    selected?.focus();
  };

  const close = (focusToggle = true) => {
    list.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focusToggle) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    list.hidden ? open() : close();
  });

  list.addEventListener('click', (e) => {
    const option = e.target.closest('[role="option"]');
    if (!option) return;
    paint(COUNTRIES.find((c) => c.code === option.dataset.code));
    close();
  });

  list.addEventListener('keydown', (e) => {
    const options = [...list.querySelectorAll('[role="option"]')];
    const index = options.indexOf(document.activeElement);

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.activeElement.click();
      return;
    }

    const moves = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: options.length - 1
    };

    if (!(e.key in moves)) return;
    e.preventDefault();
    options[(moves[e.key] + options.length) % options.length].focus();
  });

  document.addEventListener('click', (e) => {
    if (!list.hidden && !root.contains(e.target)) close(false);
  });

  return () => current;
}

// ───────────────────────────────────────────────────────────────
// 3. Валідація
// ───────────────────────────────────────────────────────────────

const RULES = {
  name(value) {
    if (!value.trim()) return 'Напишіть, будь ласка, як до вас звертатися';
    if (value.trim().length < 2)
      return 'Замало символів — потрібно щонайменше два';
    if (/\d/.test(value)) return 'В імені не має бути цифр';
    return '';
  },

  phone(value) {
    const digits = value.replace(/\D/g, '');
    if (!digits) return 'Без номера я не зможу з вами звʼязатися';
    if (digits.length < 6) return 'Схоже, номер неповний — перевірте цифри';
    if (digits.length > 14) return 'У номері забагато цифр';
    return '';
  },

  telegram(value) {
    const v = value.trim();
    if (!v) return '';
    if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(v)) {
      return 'Нік у Telegram складається з латинських літер, цифр і підкреслення — від 5 символів';
    }
    return '';
  },

  message(value) {
    if (value.length > 1000) return 'Текст задовгий — скоротіть, будь ласка';
    return '';
  },

  consent(_, field) {
    if (!field.checked) return 'Без згоди я не маю права обробляти ваші дані';
    return '';
  }
};

function validateField(field) {
  const rule = RULES[field.dataset.validate];
  if (!rule) return '';

  const message = rule(field.value ?? '', field);
  const errorBox =
    document.getElementById(`${field.id || field.name}-error`) ||
    field.closest('.field')?.querySelector('.field__error');

  field.setAttribute('aria-invalid', message ? 'true' : 'false');

  if (errorBox) {
    errorBox.textContent = message;
    errorBox.hidden = !message;
  }

  return message;
}

// ───────────────────────────────────────────────────────────────

function formInit(form, page) {
  const fields = [...form.querySelectorAll('[data-validate]')];
  const live = form.querySelector('[data-fls-form-live]');
  const success = page.querySelector('[data-fls-form-success]');
  const submit = form.querySelector('[type="submit"]');
  const trap = form.querySelector('[name="company"]');

  const touched = new Set();

  fields.forEach((field) => {
    const event = field.type === 'checkbox' ? 'change' : 'blur';

    field.addEventListener(event, () => {
      touched.add(field);
      validateField(field);
    });

    // Після першої помилки перевіряємо на кожен ввід,
    // щоб повідомлення зникло одразу після виправлення
    field.addEventListener('input', () => {
      if (touched.has(field)) validateField(field);
    });
  });

  // Телефон: лишаємо тільки цифри й пробіли
  const phone = form.querySelector('[data-validate="phone"]');
  phone?.addEventListener('input', () => {
    const cleaned = phone.value.replace(/[^\d\s]/g, '');
    if (cleaned !== phone.value) phone.value = cleaned;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Бот заповнив приховане поле — мовчки зупиняємось
    if (trap?.value) return;

    const problems = fields
      .map((field) => {
        touched.add(field);
        return { field, message: validateField(field) };
      })
      .filter((item) => item.message);

    if (problems.length) {
      if (live) {
        live.textContent =
          problems.length === 1
            ? 'Одне поле потребує уваги'
            : `${problems.length} поля потребують уваги`;
      }

      const first = problems[0].field;
      first.focus();
      first.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (live) live.textContent = '';
    submit?.setAttribute('data-loading', '');
    if (submit) submit.textContent = 'Надсилаємо…';

    try {
      // ───────────────────────────────────────────────────────
      // МІСЦЕ ПІДКЛЮЧЕННЯ БЕКЕНДУ
      // Сюди ставиться реальна відправка: PHP-обробник збірки,
      // Telegram-бот або зовнішній сервіс. Зараз — заглушка.
      //
      // await fetch('/api/lead', {
      //   method: 'POST',
      //   body: new FormData(form),
      // })
      // ───────────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 700));

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.querySelector('.success__title')?.focus();
        success.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    } catch {
      submit?.removeAttribute('data-loading');
      if (submit) submit.textContent = 'Надіслати заявку';
      if (live) live.textContent = 'Не вдалося надіслати. Спробуйте ще раз.';
    }
  });
}

// ───────────────────────────────────────────────────────────────
// 4. Лічильник символів
// ───────────────────────────────────────────────────────────────

function counterInit(page) {
  const area = page.querySelector('#ct-message');
  const counter = page.querySelector('[data-fls-counter]');
  if (!area || !counter) return;

  const update = () => {
    counter.textContent = String(area.value.length);
  };

  area.addEventListener('input', update);
  update();
}

// ───────────────────────────────────────────────────────────────

export function contactsInit() {
  const page = document.querySelector('[data-fls-contacts]');
  if (!page) return;

  const country = page.querySelector('[data-fls-country]');
  if (country) countryInit(country);

  const form = page.querySelector('[data-fls-form]');
  if (form) formInit(form, page);

  counterInit(page);
}

document.querySelector('[data-fls-contacts]')
  ? window.addEventListener('load', contactsInit)
  : null;

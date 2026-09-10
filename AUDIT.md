# Аудит проєкту psy_2.0 (FLS Start 4)

Дата аудиту: 2026-09-10. Аудит виконано без запуску build/dev-сервера та без встановлення залежностей — лише статичний аналіз файлів у робочій копії. Змінено/створено тільки цей файл.

---

## 1. Дерево проєкту

### Корінь (глибина 1, без node_modules/dist/.git)

```
.
.env
.env.example
.gitignore
.vscode/
README.TXT
cover.jpg
docker-compose.yml
package-lock.json
package.json
src/
template.config.js
template_modules/
text.docx
vite.config.js
```

`template_modules/` — це власний движок білдера FLS Start (генератори компонентів, сторінок, робота з FTP/Git/WordPress, статистика тощо). Це інфраструктура шаблону, не код проєкту.

### src/ (повне дерево)

```
src/
├── assets/
│   └── img/
│       ├── favicon.ico
│       └── home/
│           └── hero-img.jpg
├── components/
│   ├── custom/                         # порожня папка (під власні компоненти проєкту)
│   ├── effects/
│   │   ├── cursor/{cursor.js,cursor.scss}
│   │   ├── darklite/{darklite.js,darklite.scss}
│   │   ├── gsap/{gsap.html,gsap.js,gsap.scss}
│   │   ├── marquee/{marquee.html,marquee.js,marquee.scss}
│   │   ├── mouse/{mouse.html,mouse.js}
│   │   ├── parallax/{parallax.html,parallax.js,parallax.scss}
│   │   ├── preloader/{preloader.html,preloader.js,preloader.scss}
│   │   ├── ripple/{ripple.html,ripple.js,ripple.scss}
│   │   ├── screenshot/screenshot.js
│   │   ├── scrollto/scrollto.js
│   │   ├── splittype/{splittype.html,splittype.js,splittype.scss}
│   │   ├── tippy/{tippy.js,tippy.scss}
│   │   ├── watcher/watcher.js
│   │   └── zoom/{zoom.html,zoom.js,zoom.scss}
│   ├── forms/
│   │   ├── _functions.js
│   │   ├── addtocart/{addtocart.html,addtocart.js,addtocart.scss}
│   │   ├── button/{button.html,button.js,button.scss}
│   │   ├── checkbox/{checkbox.html,checkbox.js,checkbox.scss}
│   │   ├── datepicker/{_lang.json,datepicker.html,datepicker.js,datepicker.scss}
│   │   ├── form/{form.html,form.js,form.scss}
│   │   ├── input/{input.html,input.js,input.scss,plugins/{autoheight.js,mask.js,viewpass.js}}
│   │   ├── novaposhta/{novaposhta.html,novaposhta.js,novaposhta.scss}
│   │   ├── quantity/{quantity.html,quantity.js,quantity.scss}
│   │   ├── radio/{radio.html,radio.js,radio.scss}
│   │   ├── range/{range.html,range.js,range.scss}
│   │   ├── rating/{rating.html,rating.js,rating.scss}
│   │   └── select/{select.html,select.js,select.scss}
│   ├── layout/
│   │   ├── beforeafter/{beforeafter.html,beforeafter.js,beforeafter.scss}
│   │   ├── chart/{chart.html,chart.js,chart.scss}
│   │   ├── digcounter/{digcounter.html,digcounter.js,digcounter.scss}
│   │   ├── dynamic/dynamic.js
│   │   ├── footer/{footer.html,footer.js,footer.scss}
│   │   ├── fullpage/{fullpage.html,fullpage.js,fullpage.scss}
│   │   ├── gallery/{assets/…, gallery.html, gallery.js}
│   │   ├── grid/{grid.html,grid.js,grid.scss}
│   │   ├── head/{fonts-preload.html, head.html}
│   │   ├── header/{header.html,header.js,header.scss, plugins/scroll/{scroll.js,scroll.scss}}
│   │   ├── map/{_settings.js,map.html,map.js,map.scss}
│   │   ├── masonry/{masonry.html,masonry.js,masonry.scss}
│   │   ├── menu/{menu.html,menu.js,menu.json,menu.scss}
│   │   ├── popup/{popup.html,popup.js,popup.scss}
│   │   ├── showmore/{showmore.html,showmore.js,showmore.scss}
│   │   ├── slider/{slider-item.html,slider.html,slider.js,slider.scss,slides.json}
│   │   ├── spollers/{spollers.html,spollers.js,spollers.scss}
│   │   └── tabs/{tabs.html,tabs.js,tabs.scss}
│   ├── pages/
│   │   └── home/{home.html,home.js,home.scss}   # НОВА сторінка (у git — untracked)
│   ├── templates/
│   │   ├── inner/{inner.html,inner.js(порожній),inner.scss(порожній)}
│   │   └── main/{main.html,main.js(порожній),main.scss(порожній)}
├── index.html                          # точка входу сторінки "Home Page"
├── js/
│   ├── app.js                          # точка входу JS
│   ├── common/functions.js             # спільні хелпери "Чертогів Фрілансера"
│   ├── react/App.jsx                   # заготовка (React вимкнено в конфізі)
│   └── vue/App.vue                     # заготовка (Vue вимкнено в конфізі)
├── php/                                 # PHP-обробники форм (php.enable=false у конфізі)
│   ├── index.php
│   ├── sendmail/{config.php,index.php,phpmailer/…}
│   └── telegram/index.php
├── projectpage/projectpage.html         # службова сторінка білдера (генерується при projectpage.enable)
├── pug/                                  # НЕ використовується (pug.enable=false)
│   ├── components/{footer.pug,header.pug}
│   └── index.pug
├── styles/
│   ├── fonts/{fonts.css(порожній), iconfont.css(порожній)}
│   ├── includes/{extends.scss, index.scss, mixins.scss, spritemap.scss(auto-generated)}
│   ├── libs/{reset.css, tailwind.css}
│   ├── settings.scss
│   ├── style.scss
│   └── variables.css
└── wordpress/                            # повний WordPress/WooCommerce boilerplate теми (не зачіпає статичну збірку)
    └── fls-theme/…  (~300 файлів: theme, woocommerce templates, phpmailer мови тощо)
```

> Гілка `src/wordpress/` — це майже дослівна копія WooCommerce-теми з окремим набором PHP-шаблонів (single-product, checkout, emails тощо, ~300 файлів). Вона активується лише прапорцем `--wp` у vite.config.js і не має жодного стосунку до статичної багатосторінкової збірки, яку плануєте робити. Список файлів наведено у вихідному `find` (не дублюю тут, щоб не роздувати звіт — усі вони стандартні для теми WooCommerce/FLS і не редагувались).

---

## 2. Шаблонізатор

**Реально використовується власний PostHTML-препроцесор шаблону "FLS Start"** (не Nunjucks, не Pug, не PHP), побудований на `posthtml-extend` + власному `posthtmlInclude`/`posthtml-fetch` + `posthtml-expressions`. Підключення відбувається в [template_modules/posthtml/prerender.js](template_modules/posthtml/prerender.js) через плагін `prerenderHTML()`, який підвантажується в [template_modules/html.js](template_modules/html.js) як перший (`enforce: 'pre'`) плагін Vite.

Докази того, що інші рушії не активні:
- `template.config.js`: `pug.enable: false`, `php.enable: false`, `js.react: false`, `js.vue: false`.
- `vite-plugin-nunjucks` підключений у `htmlPlugins`, але в проєкті немає жодного `.njk`-файлу — плагін фактично простоює.
- `src/pug/` містить лише 2 рядки (`include @pug/components/header.pug` / `footer.pug`) і не підключений до жодної точки збірки — це залишок від можливого експерименту, не робочий шлях.
- `src/php/` не використовується, поки `php.enable: false`.

### Синтаксис наслідування (використовується власна розмітка тегами, не Jinja/Pug)

- `<template src="..." locals='{...}'>` — оголошує layout-файл сторінки та локальні змінні.
- `<block name="...">...</block>` — визначає/перевизначає блок (аналог `{% block %}`).
- `<include src="..." locals='{...}'>` — підключає HTML-партиал (аналог `{% include %}`).
- `[[ variable ]]` — інтерполяція значень (delimiters `['[[',']]']`, `posthtml-expressions`).
- `<if condition="...">…</if><else>…</else>` — умовні блоки.
- `<each loop='item in [...]'>…</each>` — цикли по масиву (вбудований у `posthtml-expressions`).

### Сторінки

Наразі в `src/` є лише **одна реальна сторінка** — [src/index.html](src/index.html) ("Home Page"). Раніше існувала `src/components/pages/index/` — вона видалена в поточних незакомічених змінах і замінена на `src/components/pages/home/` (за git status: `D src/components/pages/index/*`, `?? src/components/pages/home/`).

Ланцюжок наслідування для `index.html`:

```
src/index.html
 └─ <template src="@components/templates/main/main.html">   ← layout
     ├─ block "header" → include @components/layout/header/header.html
     ├─ block "main"   → include @components/pages/home/home.html
     ├─ block "footer" → include @components/layout/footer/footer.html
     └─ block "popup"  → (порожній)
```

`main.html`, у свою чергу, підключає `@components/layout/head/head.html` (мета-теги, шрифти, іконки, прелоадер) через `<include>` (не через `<template>`), тобто head — це партиал, а не окремий рівень наслідування.

Є другий layout-шаблон — `@components/templates/inner/inner.html` (для внутрішніх сторінок з `.inner`/`block "aside"`), але наразі жодна сторінка його не використовує.

### Повний вміст головного layout-файлу (`src/components/templates/main/main.html`)

```html
<!doctype html>
<html lang="[[lang]]">
	<include src="@components/layout/head/head.html" locals='{
		"title":"[[title]]", 
		"preloader": {
			"enable":"[[preloader.enable]]",
			"once":"[[preloader.once]]"
		},
		"keywords":"[[keywords]]", 
		"description":"[[description]]"
	}'>
	</include>
	<script type="module" src="@components/templates/main/main.js"></script>
	<link rel="stylesheet" href="@components/templates/main/main.scss">
	<body>
		<div class="wrapper">
			<block name="header"></block>
			<main class="page">
				<block name="main"></block>
			</main>
			<block name="footer"></block>
		</div>
		<block name="popup"></block>
		<script type="module" src="@js/app.js"></script>
	</body>
</html>
```

Для довідки — партиал `head.html`, який підключається зсередини (не є окремим рівнем наслідування, але формує фактичний `<head>`):

```html
 <head>
	<if condition="'[[preloader.enable]]' === 'true'">
		<include src="@components/effects/preloader/preloader.html" locals='{"once":"[[preloader.once]]"}'></include>
	</if>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<include src="@components/layout/head/fonts-preload.html"></include>
	<link rel="stylesheet" href="@styles/fonts/fonts.css">
	<link rel="stylesheet" href="@styles/fonts/iconfont.css">
	<link rel="stylesheet" href="@styles/style.scss">
	<link rel="shortcut icon" href="@img/favicon.ico">
	<if condition="'[[keywords]]' !== ''">
		<meta name="keywords" content="[[keywords]]">
	</if>
	<if condition="'[[description]]' !== ''">
		<meta name="description" content="[[description]]">
	</if>
	<title>[[title]]</title>
</head>
```

`fonts-preload.html` і `src/styles/fonts/{fonts.css,iconfont.css}` — порожні файли (шрифти зараз не локальні, див. розділ 9).

---

## 3. Конфіг стилів

### src/styles/settings.scss (27 рядків, повністю)

```scss
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Налаштування адаптивної сітки
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Мінімальна ширина сторінки
$minWidth: 320;
// Ширина полотна (макету)
$maxWidth: 1920;
// Ширина обмежуючого контейнера (0 = немає обмеження)
$maxWidthContainer: 1400;
// Загальний відступ у контейнера
// (30 = по 15px ліворуч і праворуч, 0 = немає відступу)
$containerPadding: 30;

// Ширина спрацьовування першого брейкпоінту
$containerWidth: $maxWidthContainer + $containerPadding;

// Брейк-поїнти
$pc: $containerWidth; // ПК, ноутбуки, деякі планшети у горизонтальному положенні
$tablet: 992; // Планшети, деякі телефони в горизонтальному положенні
$mobile: 768; // Телефони L
$mobileSmall: 480; // Телефони S

// Тип адаптива:
// 1 = чуйність (у контейнера немає брейкпоінтів),
// 2 = по брейк-поїнт (контейнер змінює свою ширину по брейк-поїнт)
$responsiveType: 1;
```

### src/styles/variables.css (23 рядки, повністю)

```css
:root {
  --font-family: 'Fraunces', Georgia, serif;
  --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size: 16px;
  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  --bg: #faf8f5;
  --surface: #ffffff;
  --surface-alt: #f5f2ec;
  --sage: #6b2e37;
  --sage-hover: #3e1319;
  --sage-soft: rgba(46, 93, 79, 0.08);
  --main-color: #1c1c1a;
  --ink-soft: #6b6b66;
  --border: #eae5dd;
  --border-soft: #f0ebe3;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.03);
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 8px 32px rgba(28, 28, 26, 0.06);
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
}
```

> Зверніть увагу: назва змінної `--sage` містить значення `#6b2e37` (бордовий), а не salvie/шавлієвий, як натякає назва; коментар `--sage-soft: rgba(46, 93, 79, 0.08)` (зелений) взагалі не відповідає жодному з визначених `--sage*`-кольорів. Схоже, палітру міняли і не досинхронізували. Деталі — розділ 11.

### src/styles/style.scss (111 рядків, повністю)

```scss
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Підключення загальних змінних
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@use 'variables';
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Підключення загальних віддалених шрифтів (Google Fonts)
@import url(https://fonts.googleapis.com/css?family=Fraunces:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);
@import url(https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);
// Використовуйте плагін для VS Code Better Google Fonts for VS Code (https://marketplace.visualstudio.com/items?itemName=Pavlo-K.better-google-fonts)
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Стилі тега BODY
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
body {
  color: var(--main-color);
  font-family: var(--font-family);
  font-size: var(--font-size);

  min-width: #{$minWidth}px;

  // Скролл заблоковано
  [data-fls-scrolllock] & {
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
  }
  // Сайт завантажений
  [data-fls-loaded] & {
  }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Оболонка WRAPPER
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: clip;

  // Притискаємо footer
  > main {
    flex: 1 1 auto;
  }
  // Фікс для слайдерів
  > * {
    min-width: 0;
  }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Обмежуючий контейнер
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Стилі будуть застосовуватись до
// всіх класів, що містять *__container
// Наприклад header__container, main__container і т.п.
// Сніппет (HTML): cnt
@if ($responsiveType==1) {
  // Чуйна
  [class*='__container'] {
    @if ($maxWidthContainer>0) {
      max-width: #{$containerWidth}px;
      margin: 0 auto;
    }
    @if ($containerPadding>0) {
      @if ($maxWidthContainer>0) {
        padding-left: #{math.div($containerPadding, 2)}px;
        padding-right: #{math.div($containerPadding, 2)}px;
      } @else {
        @include adaptiveValue(
          'padding-left',
          math.div($containerPadding, 2),
          15
        );
        @include adaptiveValue(
          'padding-right',
          math.div($containerPadding, 2),
          15
        );
      }
    }
  }
} @else {
  // Брейк-поїнтами
  [class*='__container'] {
    margin: 0 auto;
    @if ($maxWidthContainer>0) {
      max-width: #{$maxWidthContainer}px;
    } @else {
      @if ($containerPadding>0) {
        padding-left: #{math.div($containerPadding, 2)}px;
        padding-right: #{math.div($containerPadding, 2)}px;
      }
    }
    @media (max-width: toEm($pc)) {
      max-width: 970px;
    }
    @media (max-width: toEm($tablet)) {
      max-width: 750px;
    }
    @media (max-width: toEm($mobile)) {
      max-width: none;
      @if ($containerPadding>0 and $maxWidthContainer>0) {
        padding-left: #{math.div($containerPadding, 2)}px;
        padding-right: #{math.div($containerPadding, 2)}px;
      }
    }
  }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Загальні стилі для усього сайту
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

Файл обривається на коментарі-заготовці "Загальні стилі для усього сайту" — далі нічого не написано.

### src/styles/includes/ — файли

| Файл | Призначення |
|---|---|
| `index.scss` | Точка збірки: `@forward` на settings, spritemap, mixins, extends. Підключається автоматично до кожного SCSS-файлу через `additionalData` у `vite.config.js`. |
| `mixins.scss` | Функції та міксини (сигнатури нижче). |
| `extends.scss` | Плейсхолдер-селектори (`%name`) для `@extend`. |
| `spritemap.scss` | Автогенерований файл (коментар `Generated by vite-plugin-svg-spritemap`) зі SCSS-мапою `$sprites` — інлайн SVG як data-URI для кожної іконки. Редагувати вручну не потрібно. |

**Функції та міксини `mixins.scss` (лише сигнатури):**

```scss
@function percent($px, $from: 100)
@function toRem($px, $current: 16)
@function toEm($px, $current: 16)

@mixin currency($sym)
@mixin triangle($direction, $color, $size, $size2: $size)
@mixin gridCards($type: fit, $min: 280px, $max: 1fr, $gap: 30px)
@mixin adaptiveValue($property, $startSize, $minSize: settings.$minSize, $keepSize: 0, $widthFrom: settings.$containerWidth, $widthTo: settings.$minWidth)
@mixin gridContainer($type: 0, $container: settings.$maxWidthContainer, $paddingStart: math.div(settings.$containerPadding, 2), $paddingEnd: math.div(settings.$containerPadding, 2))
```

**Плейсхолдери `extends.scss` (без тіла, лише перелік):**

```scss
%ibg              // об'єктне заповнення для чуйних зображень (IBG)
%listCounter      // лічильник для списку (counter-reset/increment)
%responsiveVideo  // адаптивне video/iframe (aspect-ratio 16:9)
%videoBackground  // відео як фон на весь екран
%grayfilter       // ч/б фільтр з кольором при ховері
%noselect         // user-select: none
%mirror           // дзеркальне відображення (scale(-1,1))
%smoothscroll     // -webkit-overflow-scrolling: touch
%hidescroll        // приховати нативний скролбар
```

`src/styles/libs/` містить `reset.css` (підключається у `head.html` замість Tailwind, бо `styles.tailwindcss: false`) та `tailwind.css` (не використовується, поки прапорець вимкнено).

---

## 4. Компоненти

Компонентна тека — `src/components/`, поділена на 6 категорій. Більшість — це стандартна бібліотека компонентів шаблону FLS Start (готові до підключення, але без проєктного наповнення), і лише `pages/home` є фактично написаним контентом проєкту.

### effects/ — JS/CSS-ефекти (бібліотека шаблону)

| Компонент | Файли | Що це |
|---|---|---|
| cursor | js, scss | Кастомний курсор, що слідує за мишею |
| darklite | js, scss | Перемикач світлої/темної теми |
| gsap | html, js, scss | Приклад анімації на GSAP |
| marquee | html, js, scss | Біжучий рядок / нескінченна стрічка |
| mouse | html, js | Рух елементів за курсором (mouse-parallax) |
| parallax | html, js, scss | Паралакс-ефект при скролі |
| preloader | html, js, scss | Прелоадер сторінки (перед першим показом) |
| ripple | html, js, scss | Ripple-ефект на кліку (як у Material) |
| screenshot | js | Скріншот блоку/сторінки (html2canvas) |
| scrollto | js | Плавний скрол до анкора/блоку |
| splittype | html, js, scss | Пооб'єктна анімація тексту (SplitType) |
| tippy | js, scss | Тултіпи (tippy.js) |
| watcher | js | Спостерігач появи елементів у в'юпорті (IntersectionObserver) |
| zoom | html, js, scss | Зум зображення при наведенні/кліку |

### forms/ — елементи форм (бібліотека шаблону)

| Компонент | Файли | Що це |
|---|---|---|
| _functions.js | — | Спільна логіка валідації форм (`formValidate`) |
| addtocart | html, js, scss | Кнопка "додати в кошик" |
| **button** | html, js, scss | Базова кнопка — **єдиний форм-компонент, доопрацьований під проєкт** (варіанти `--primary/--outline/--ghost`, розміри `--lg/--sm`, див. розділ 5-суміжний) |
| checkbox | html, js, scss | Кастомний чекбокс |
| datepicker | html, js, scss, `_lang.json` | Календар вибору дати (js-datepicker) |
| form | html, js, scss | Обгортка форми з валідацією/відправкою |
| input | html, js, scss, `plugins/{autoheight,mask,viewpass}.js` | Текстове поле з плагінами (маска, показ пароля, авто-висота textarea) |
| novaposhta | html, js, scss | Вибір відділення "Нової пошти" |
| quantity | html, js, scss | Лічильник кількості товару (+/-) |
| radio | html, js, scss | Кастомний radio-button |
| range | html, js, scss | Повзунок діапазону (noUiSlider) |
| rating | html, js, scss | Рейтинг зірками |
| select | html, js, scss | Кастомний `<select>` |

### layout/ — компонування сторінки та UI-блоки (бібліотека шаблону)

| Компонент | Файли | Що це |
|---|---|---|
| beforeafter | html, js, scss | Слайдер порівняння "до/після" |
| chart | html, js, scss | Графіки (Chart.js) |
| digcounter | html, js, scss | Анімований лічильник цифр |
| dynamic | js | Динамічне довантаження контенту |
| **footer** | html, js, scss | Футер сайту — підключений у layout, **розмітка порожня** |
| fullpage | html, js, scss | Повноекранний скрол по секціях |
| gallery | html, js, `assets/*` (lightGallery css/шрифти) | Фотогалерея з лайтбоксом |
| grid | html, js, scss | Сітка карток |
| head | `fonts-preload.html`, `head.html` | `<head>` сторінки, прелоад шрифтів |
| **header** | html, js, scss, `plugins/scroll/{js,scss}` | Шапка сайту — **доопрацьована під проєкт**, див. розділ 5 |
| map | html, js, scss, `_settings.js` | Карта (Google Maps через `@googlemaps/js-api-loader`) |
| masonry | html, js, scss | "Цегляна" сітка з фільтрацією (Isotope) |
| **menu** | html, js, json, scss | Навігаційне меню (десктоп + мобільне), **доопрацьоване під проєкт** |
| popup | html, js, scss | Модальні вікна |
| showmore | html, js, scss | Розгортання "показати більше" |
| slider | html × 2, js, scss, `slides.json` | Слайдер (Swiper) |
| spollers | html, js, scss | Акордеон / спойлери (FAQ) |
| tabs | html, js, scss | Вкладки |

### pages/ — сторінки проєкту

| Компонент | Файли | Що це |
|---|---|---|
| **home** | html, js, scss | Головна сторінка проєкту — **єдиний фактично наповнений контент**, поки лише hero-секція (див. розділ 6) |

### templates/ — layout-шаблони (обгортки сторінок)

| Компонент | Файли | Що це |
|---|---|---|
| main | html, js(порожній), scss(порожній) | Layout для звичайних сторінок (`header + main + footer`) |
| inner | html, js(порожній), scss(порожній) | Layout для внутрішніх сторінок (`header + .inner{main+aside} + footer`), поки ніде не використовується |

### Інше

- `src/components/custom/` — порожня, зарезервована директорія під власні компоненти проєкту.
- `src/projectpage/projectpage.html` — службова сторінка-каталог компонентів, яку генерує сам білдер (`projectpage.enable`), не є частиною сайту.

---

## 5. Хедер (вже зроблений)

### Повний вміст розмітки (`src/components/layout/header/header.html`)

```html
<header data-fls-header class="header">
  <div class="header__container">
    <div class="header__body">
      <a href="index.html" class="header__link-logo">Альона Снігур</a>

      <include
        src="@components/layout/menu/menu.html"
        locals='{"active":"[[active]]"}'
      ></include>
      <a
        href="/contacts.html"
        data-fls-button
        class="header__btn btn btn--primary btn--sm nav__cta"
        >Записатися</a
      >
    </div>
  </div>
</header>
```

Меню підключене через `<include>` з параметром `active` (для підсвічування активного пункту — прокидається зі сторінки, напр. `{"active":"Home"}` в `src/index.html`).

### Повний вміст SCSS (`src/components/layout/header/header.scss`)

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  //   background-color: rgba(250, 250, 248, 0.85);
  padding-top: 15px;
  padding-bottom: 15px;

  animation: header-appear 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &--scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: toEm($tablet)) {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  // .header__container

  &__container {
    width: 100%;
    @media (max-width: toEm($mobile)) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  // .header__body

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .header__button

  &__btn.btn {
    @media (max-width: toEm($mobile)) {
      display: none;
    }
  }
}
```

### БЕМ-нейминг

Блок `.header`, елементи через `&__` (`__container`, `__body`, `__link-logo`, `__btn`, `__menu`), модифікатор `&--scrolled`. Меню — окремий БЕМ-блок `.menu` (`__icon`, `__body`, `__list`, `__item`, `__link` + модифікатор `--active`), вкладений у `.header__menu`. Витриманий стиль коментарів `// .header__container` перед кожним елементом — конвенція шаблону FLS Start.

### Мобільне меню

Реалізація на чистому JS + CSS, без бібліотек:
- Кнопка-бургер `.menu__icon.icon-menu` з `data-fls-menu`.
- Клік по `[data-fls-menu]` перемикає атрибут `data-fls-menu-open` на `<html>` і блокує скрол (`bodyLockToggle()` з `src/js/common/functions.js`) — логіка в [menu.js](src/components/layout/menu/menu.js).
- Видимість `.menu__body` на мобільних керується через `html[data-fls-menu-open] &` (offcanvas зліва: `left: -100%` → `left: 0`, `transition: left 0.3s`, `height: 100svh`).
- Іконка бургера анімується в хрестик через `html[data-fls-menu-open] & span/::before/::after`.
- Брейкпоінт мобільного меню — `$mobile` (768px), заданий у `settings.scss`.

⚠️ **Знахідка**: `menu.js` ніде не імпортується (ні в `app.js`, ні в `main.js`/`main.html`, ні деінде) — див. розділ 7 та 11. Це означає, що на момент аудиту клік по бургеру **не спрацює**, поки хтось явно не підключить `menuInit()`.

### Стани

- `--header-scroll` / `--header-show` — CSS-класи, які додає модуль [header/plugins/scroll/scroll.js](src/components/layout/header/plugins/scroll/scroll.js) через слухач `scroll`, орієнтуючись на атрибути `data-fls-header-scroll` (поріг), `data-fls-header-scroll-show` (авто-приховування при скролі вниз) і `data-fls-header-scroll-show` (таймер показу, `data-fls-header-scroll-show`, за замовч. 500мс).
- **Але** в поточній розмітці `header.html` немає жодного з атрибутів `data-fls-header-scroll*` — тобто плагін підключений файлово (`scroll.scss`/`scroll.js` існують), проте не активований на самому хедері.
- У SCSS вже є модифікатор `&--scrolled` (box-shadow), який теж ніде не проставляється в JS (JS генерує клас `--header-scroll`, а не `--scrolled`) — невідповідність нейминга між SCSS і плагіном скролу.
- Фон хедера закоментований (`//   background-color: rgba(250, 250, 248, 0.85)`), залишено лише `backdrop-filter: blur(14px)` — ефект "скла" без підкладки кольору.

---

## 6. Головна сторінка

На головній зараз зверстана **лише одна секція** — Hero.

| Секція | Розмітка | SCSS | Стан |
|---|---|---|---|
| Hero (`.home__hero`) | [src/components/pages/home/home.html](src/components/pages/home/home.html) | [src/components/pages/home/home.scss](src/components/pages/home/home.scss) | Розмітка є, стилі — лише порожні БЕМ-заготовки (жоден елемент фактично не стилізований, крім `display:flex` на `.hero__content` і паддінгів на `.home__hero`) |

### Повний вміст `home.html`

```html
<main data-fls-home class="page page--home">
  <section class="home__hero hero">
    <div class="hero__conatiner">
      <div class="hero__content">
        <div class="hero__blockhead blockhead">
          <span class="blockhead__label"> Психологічна допомога </span>
          <h1 class="blockhead__title">РХП та порушення образу тіла</h1>
          <div class="blockhead__text">
            <p>
              Допомагаю дорослим і підліткам впоратися з розладами харчової
              поведінки та порушеннями образу тіла. Індивідуальні консультації
              та групова терапія для дорослих,підлітків та їх батьків.
            </p>
          </div>
          <div class="blockhhead__button button-blockhead">
            <a href="#" class="button-blockhead__book btn btn--primary btn--lg"
              >Записатися на консультацію</a
            >
            <a href="#" class="button-blockhead__book btn btn--outline btn--lg"
              >Як проходить перша зустріч</a
            >
          </div>
          <div class="blockhhead__trust">
            <span>медична + психологічга освіта</span>
            <span class="dot"></span>
            <span>РХП та образ тіла</span>
            <span class="dot"></span>
            <span>консультація онлайн</span>
          </div>
        </div>
        <div class="hero__img">
          <img src="@img/home/hero-img.jpg" alt="Image" />
        </div>
      </div>
    </div>
  </section>
</main>
```

Порядок секцій: лише Hero (перша й наразі єдина). Структура класів: `.home__hero` (секція) → `.hero__container` (контейнер, з друкарською помилкою `conatiner`) → `.hero__content` (flex-обгортка) → `.hero__blockhead.blockhead` (текстовий блок) + `.hero__img` (зображення).

### Що незакінчено на головній

- Стилі hero практично не написані — БЕМ-скелет `home.scss` містить лише порожні правила (`&__label {}`, `&__title {}` і т.д.) без жодних реальних властивостей, крім двох (`padding` на `.home__hero`, `display:flex` на `.hero__content`).
- Обидва CTA (`button-blockhead__book`) ведуть на `href="#"` — не звёрстані реальні посилання.
- Секцій, окрім Hero, немає взагалі (немає "Про мене", "Сервіси", "Блог", "Вебінари" — хоча ці пункти вже перелічені в меню).
- Клас `.hero__conatiner` — одруківка (треба `container`, інакше загальний стиль `[class*='__container']` з `style.scss` до нього не застосується — секція, ймовірно, не отримує потрібних відступів/max-width!).
- Дублікат класу `.button-blockhead__book` на двох різних за призначенням кнопках (primary CTA і secondary "як проходить зустріч") — БЕМ це не забороняє, але для різної стилізації знадобляться додаткові модифікатори.

---

## 7. JavaScript

### Структура `src/js/`

```
src/js/
├── app.js            # точка входу (підключається в main.html: <script type="module" src="@js/app.js">)
├── common/
│   └── functions.js  # спільні утиліти "Чертогів Фрілансера"
├── react/App.jsx      # заготовка компонента (не використовується)
└── vue/App.vue        # заготовка компонента (не використовується)
```

### Точка входу

`src/js/app.js` — **весь вміст**:

```js
// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"
```

⚠️ Файл лише **імпортує** утиліти, але жодну з них не викликає (`addTouchAttr()`/`addLoadedAttr()` в базовій версії шаблону зазвичай викликаються тут для проставлення `data-fls-touch`/`data-fls-loaded` на `<html>`) і **не імпортує жодного компонента** (`header.js`, `menu.js`, `footer.js`, `button.js`, `home.js` тощо). Ці компонентні скрипти не підключені й в `main.js`/`inner.js` шаблонів — обидва файли порожні.

**Наслідок**: на зібраній сторінці зараз реально виконається лише `home.js` (`import './home.scss'` — підключений напряму компонентом сторінки; втім, і той не виконує нічого, крім імпорту стилів), а `header.js`/`menu.js`/`button.js`/`footer.js` не потраплять у бандл жодним чином, доки їх явно не заімпортувати. Мобільне бургер-меню, отже, не працюватиме "з коробки" — див. також розділ 11.

### Модулі збірки (увімкнено/вимкнено, за `template.config.js`)

| Модуль | Стан |
|---|---|
| React (`js.react`) | вимкнено (`false`) |
| Vue (`js.vue`) | вимкнено (`false`) |
| Бандл в один JS/CSS (`js.bundle.enable`) | вимкнено — файли розбиваються по чанках |
| Dev-файли без мініфікації (`js.devfiles`) | увімкнено |
| Гарячі модулі (`js.hotmodules`) | увімкнено |
| PHP-проксі (`php.enable`) | вимкнено |
| Pug (`pug.enable`) | вимкнено |
| NovaPoshta API (`novaposhta.enable`) | вимкнено |
| Tailwind (`styles.tailwindcss`) | вимкнено (використовується `reset.css`) |
| SVG-спрайт (`images.svgsprite`) | вимкнено (спрайти йдуть через `spritemap.scss`, а не окремий SVG-файл) |
| Іконошрифт (`fonts.iconsfont`) | вимкнено |

### Власний написаний код (не бібліотеки)

- `src/js/common/functions.js` — набір хелперів: `FLS()` (логер із перекладом повідомлень), `isMobile`, `addTouchAttr`, `addLoadedAttr`, `getHash`/`setHash`, `slideUp`/`slideDown`/`slideToggle`, `bodyLock`/`bodyUnlock`/`bodyLockToggle`, `getKeyByValue`, `getDigFromString`, `getDigFormat`, `removeClasses`, `uniqArray`, `indexInParent`, `isHidden`, `dataMediaQueries`, `gotoBlock`, `formatDate`. Це стандартний набір утиліт шаблону FLS Start, не написаний спеціально під проєкт psy_2.0, але активно використовується компонентами.
- `src/components/forms/_functions.js` — `formValidate` (валідація required-полів, email-regex, класи `--form-error`/`--form-success`, `formClean`) — теж стандартний модуль шаблону.
- `src/components/layout/menu/menu.js` — `menuInit()`, логіка відкриття/закриття офканвас-меню (написано під проєкт, використовує спільні хелпери).
- `src/components/layout/header/plugins/scroll/scroll.js` — `headerScroll()`, логіка sticky/show-hide хедера при скролі (бібліотечний модуль шаблону, підключення в проєкті не активоване).
- `src/components/pages/home/home.js` — лише `import './home.scss'`, логіки немає.
- `src/components/forms/button/button.js`, `header.js` — не переглядались детально, але за конвенцією шаблону це, ймовірно, теж лише `import './*.scss'`-обгортки (у `header.js` підтверджено: рівно один рядок `import './header.scss'`).

---

## 8. Vite

Файл: [vite.config.js](vite.config.js) (443 рядки повністю, тут — лише вибірка за запитом).

### Активні плагіни (гілка звичайної збірки, не `--wp`/`--blocks`)

Формуються з `template_modules/template.imports.js` за прапорцями `template.config.js`, у такому порядку:
1. `htmlPlugins` — `prerenderHTML()` (власний PostHTML), `nunjucks()` (не використовується фактично), навпанель у dev (`navpanel.dev: true`), пост-обробка HTML при білді (beautify через `posthtml-beautify`, заміна `__spritemap`).
2. `scriptsPlugins` — обробка JS (esbuild/rollup-налаштування шаблону).
3. `imagePlugins` — оптимізація зображень (sharp/svgo, конвертація у WebP — див. розділ 9).
4. `fontPlugins` — робота зі шрифтами (не активна, `fonts.download: false`).
5. `stylesPlugins` — SCSS/PostCSS (autoprefixer, cssnano, postcss-sort-media-queries, postcss-combine-media-query).
6. `phpPlugins` — вимкнено (`php.enable: false`).
7. React/Vue — умовно, обидва вимкнені.
8. NovaPoshta — вимкнено.
9. `projectPage` — тільки на проді, якщо `projectpage.enable` (зараз `false`).
10. `coffeeTime` — тільки в dev, `coffee.enable: true` (нагадування зробити перерву кожні 45 хв — не стосується збірки сторінок).
11. `statPlugins` — збір статистики шаблону (`statistics.enable: false`, тому неактивно).
12. `add-version` — кеш-бастинг `?v=timestamp` для `.css`/`.js` у проді (`server.version: true`).
13. Службові: `custom-hmr` (повний reload при зміні `.html/.json/.php`), `message-dev`/`message-build` (логи в термінал), `getDev()`.

### Аліаси шляхів (`template.config.js → aliases`, резолвляться у `vite.config.js` через `makeAliases`)

```js
'@components' → src/components
'@js'         → src/js
'@styles'     → src/styles
'@fonts'      → src/assets/fonts
'@img'        → src/assets/img   (або src/wp-content/.../assets/img тільки в dev + --wp)
'@video'      → src/assets/video
'@files'      → src/files
'@pug'        → src/pug
```

Плюс `vue: 'vue/dist/vue.esm-bundler.js'` в `resolve.alias` (навіть попри `js.vue: false` — залишковий alias, нешкідливий, поки Vue не імпортується).

### Налаштування, що впливають на структуру сторінок і збірку

- `root: path.join(__dirname, 'src')` — коренем Vite є `src/`, усі шляхи в HTML/аліасах рахуються від нього.
- `rollupOptions.input`: у звичайній збірці — `globSync('./src/*.html', {ignore: [devcomponents.filename]})`, тобто **кожен `.html`-файл прямо в `src/` (не у підпапках!) стає окремою точкою входу/окремою сторінкою**. Зараз це лише `src/index.html`. **Для багатосторінкового сайту нові сторінки потрібно класти саме як `src/<name>.html` в корені `src/`**, а не в `src/components/pages/...` (та тека — лише для партиалів, які підключаються через `<include>`).
- `build.outDir`: `dist/` (або `src/wordpress/fls-theme/build` при `--wp`).
- `assetsInclude: ['src/components/**/*.html']` — HTML-партиали в компонентах трактуються як асети (не окремі точки входу).
- `assetsInlineLimit: 0` — жодні асети не інлайняться в base64, усе виноситься в окремі файли.
- `cssCodeSplit: true` (з `styles.codesplit`) — CSS розбивається по чанках/сторінках, а не в один файл.
- `manualChunks`: якщо `js.bundle.enable` вимкнено (як зараз) — `js/custom/*` файли йдуть в окремі чанки за іменем файлу, а все з `src/js/app.js` — у чанк `common`.
- `assetFileNames`/`entryFileNames`/`chunkFileNames` — кастомна розкладка вихідних файлів (`css/[name].min.css`, `js/[name].min.js`, шрифти в `assets/fonts`), залежно від `server.globaldecompress`/`js.bundle.enable`/`server.buildforlocal`.
- `base: templateConfig.server.path` (`'./'`) — відносні шляхи в білді.
- `server.proxy['/php']` — проксі на PHP dev-сервер (неактуально, поки `php.enable: false`).

---

## 9. Асети

### src/assets/

```
src/assets/
└── img/
    ├── favicon.ico
    └── home/
        └── hero-img.jpg   (2.9 МБ, JPEG)
```

Це **все**, що зараз є в асетах проєкту — жодних інших зображень, немає окремих тек для іконок/шрифтів/відео (`@fonts`, `@video`, `@files` аліаси налаштовані, але відповідних тек `src/assets/fonts`, `src/assets/video`, `src/files` не існує).

⚠️ `hero-img.jpg` — майже 3 МБ, не оптимізоване (для порівняння: build-пайплайн шаблону вміє автоматично стискати/конвертувати в WebP/AVIF при `vite build`, але це відбувається тільки під час збірки, а не зараз).

### Іконки (SVG)

Іконки не лежать окремими файлами — вони згенеровані у `src/styles/includes/spritemap.scss` як SCSS-мапа `$sprites` (data-URI, плагін `@spiriit/vite-plugin-svg-spritemap`). Список імен:

```
bank-note, calendar, card, check-mark, delivery-two, delivery,
discount-star, envelope-mail, face-shape, fb_icon, linkedin_icon,
location_icon, location, mail_icon, medal-star, "Outlet logo",
phone_icon, pinterest_icon, shield-tick, shopping_cart_icon,
social-whatsapp, social-youtube,
"take-into-account-the landing-of-the-nose", twitter_icon,
user-profile, wallet-check
```

Ці іконки — це, судячи з назв (bank-note, delivery, discount-star, shopping_cart_icon, "Outlet logo") — набір із **іншого демо-проєкту** шаблону (e-commerce demo), а не з психологічного сайту. Жодна з них поки не використовується в `home.html`/`header.html`. Варто перегенерувати спрайт під власні іконки проєкту перед версткою нових секцій.

### Шрифти

- **Google Fonts** — підключені віддалено через `@import url(...)` прямо в [src/styles/style.scss](src/styles/style.scss): `Fraunces` (основний, `--font-family`) і `Inter` (додатковий, `--font-secondary`), з усіма насичeностями/курсивами.
- **Локально/через `vite-plugin-webfont-dl`** — не використовується: `fonts.download: false` у `template.config.js`, і файли `src/styles/fonts/fonts.css`, `src/styles/fonts/iconfont.css`, `src/components/layout/head/fonts-preload.html` — усі **порожні** (заготовки під локальні/прелоад-шрифти, ще не заповнені).
- Директорія `src/assets/fonts/` (аліас `@fonts`) — не існує.

---

## 10. Домовленості коду

- **Нейминг класів** — строгий БЕМ: `block__element--modifier` (напр. `hero__blockhead`, `btn--primary`, `menu__link--active`). Контейнери йменуються за конвенцією `*__container` (навмисно, під загальний селектор `[class*='__container']` у `style.scss`) — і саме тому одруківка `hero__conatiner` у `home.html` "ламає" це правило (розділ 6/11).
- **Коментарі-якорі перед кожним БЕМ-елементом у SCSS** — конвенція шаблону: `// .block__element` одразу над відповідним вкладеним правилом (видно в `header.scss`, `home.scss`, `menu.scss`).
- **Відступи**: неоднорідно.
  - Інфраструктура білдера (`template.config.js`, `template_modules/**/*.js`, `vite.config.js`) — **таби**.
  - Компонентні файли, дописані/відредаговані під проєкт (`home.html`, `header.scss`, `button.scss`, `menu.scss`) — **2 пробіли**.
  - Це означає, що при подальшій верстці варто свідомо обрати один стиль для нових файлів проєкту (рекомендація: тримати 2 пробіли, як в уже написаних `home.*`/`header.*`, оскільки саме цей стиль домінує в компонентах-сторінках).
- **Лапки**: у SCSS/CSS переважно одинарні (`'Fraunces'`, `'@styles/settings'`), у HTML — подвійні атрибути (стандарт HTML). У JS (`functions.js`) переважають одинарні лапки (60 проти 12 подвійних), подвійні трапляються там, де рядок сам містить апостроф чи в JSON-подібних місцях.
- **Порядок `@use`/`@forward` у SCSS**: глобальний порядок фіксовано в [src/styles/includes/index.scss](src/styles/includes/index.scss) — `settings → spritemap → mixins → extends`, підключається автоматично до кожного `.scss`-файлу через `additionalData` у `vite.config.js` (`@use "sass:math"; @use "@styles/includes/index.scss" as *;`) — тобто писати власні `@use` для цих чотирьох модулів в компонентах не потрібно (і не робиться — жоден компонентний `.scss` не має локальних `@use`).
- **Лінтери/форматери**: у проєкті немає жодного конфігу — ні `.eslintrc*`, ні `.prettierrc*` у корені чи `src/` (усі знайдені `.eslintrc` — лише всередині невикористовуваного `src/wordpress/fls-theme/`, не стосуються основної збірки). `.vscode/settings.json` містить лише мапінг шляхів для автокомпліту (`path-autocomplete.pathMappings`) і шаблон для генератора компонентів — жодних правил форматування коду.
- **Іменування файлів компонента**: кожен компонент — окрема тека з файлами `<name>.html`/`<name>.js`/`<name>.scss`, що збігаються з іменем теки (конвенція генератора `template_modules/createcomponent.js`).
- **data-атрибути для JS-гуків**: `data-fls-*` (напр. `data-fls-header`, `data-fls-menu`, `data-fls-button`, `data-fls-home`) — окремий простір імен від класів, які відповідають лише за стилі. Це послідовно витримано в усіх переглянутих компонентах.

---

## 11. Незавершене

Жодних текстових міток `TODO`/`FIXME` у проєкті не знайдено — пошук за `TODO|FIXME|XXX` по `src/` не дав збігів. Незавершеність видно за станом коду:

1. **Мобільне/десктопне меню JS не підключений до збірки.** `menu.js` (і `header.js`, `button.js`, `footer.js`) ніде не імпортується — ні в `src/js/app.js` (лише імпортує хелпери, нічого не викликає), ні в порожніх `main.js`/`inner.js` шаблонів. Практичний наслідок: бургер-кнопка в поточному стані проєкту не відкриє меню, поки хтось явно не задопише виклик `menuInit()` (і за потреби `headerScroll()`) у точку входу.
2. **Плагін sticky-хедера не активований у розмітці.** `header/plugins/scroll/scroll.js` очікує атрибути `data-fls-header-scroll[-show]` на `<header>`, а в `header.html` жодного з них немає — плагін підключений файлово, але не "увімкнений". Плюс невідповідність нейминга: JS додає клас `--header-scroll`, а в `header.scss` написаний модифікатор `&--scrolled` — вони не поєднані.
3. **Головна сторінка — лише Hero-секція.** Немає розмітки для "Про мене", "Сервіси", "Блог", "Вебінари" (хоча ці пункти вже прописані в `menu.html`) — тобто меню посилається на розділи, яких ще не існує на сторінці.
4. **`home.scss` — БЕМ-скелет без стилів.** Майже всі селектори (`&__label`, `&__title`, `&__text`, `&__img`, `.blockhead`, `.blockhhead`, `.button-blockhead`, `.dot`) — порожні правила-заготовки; реально стилізовано лише `.home__hero` (паддінги) і `display:flex` на `.hero__content`.
5. **Биті/плейсхолдерні посилання**: обидва CTA на головній (`button-blockhead__book`) мають `href="#"`; лого в хедері веде на `href="index.html"` (відносний шлях, ще ок для однієї сторінки, але варто узгодити з майбутньою багатосторінковою структурою), кнопка "Записатися" в хедері веде на `/contacts.html`, якої в проєкті ще не існує.
6. **Одруківки в класах на головній**: `hero__conatiner` (треба `container` — інакше не спрацює загальний стиль `[class*='__container']` з `style.scss`, і секція втратить max-width/паддінги), `blockhhead` замість `blockhead` (подвійне "h", використовується у двох місцях: `blockhhead__button`, `blockhhead__trust`), одруківки в тексті: "психологічга освіта", "для дорослих,підлітків" (без пробілу після коми).
7. **CSS-змінні використовуються, але не оголошені.** `src/components/forms/button/button.scss` посилається на `var(--font-sans)` (рядок 6) і `var(--ink)` (рядки 36, 40) — жодної з них немає в `src/styles/variables.css` (там є `--font-family`/`--font-secondary` і `--ink-soft`, але не `--ink`). Фактично кнопки `.btn--ghost` (і шрифт усіх кнопок) зараз впадуть на дефолтні/успадковані значення браузера.
8. **Неузгоджена колірна палітра**: `--sage: #6b2e37` — це бордовий/бургунді колір, а не шавлієво-зелений, як підказує назва; `--sage-soft: rgba(46, 93, 79, 0.08)` — навпаки, зелений відтінок, що не відповідає жодному з оголошених `--sage`/`--sage-hover`. Варто вирішити, яка палітра фінальна, і привести назви змінних у відповідність.
9. **Порожні заготовки шаблону** (штатні для FLS Start, не є помилкою, але позначають незаповнені місця): `footer.html` (порожній `<div class="footer__container">`), `templates/main/main.js`, `templates/main/main.scss`, `templates/inner/inner.js`, `templates/inner/inner.scss`, `src/styles/fonts/fonts.css`, `src/styles/fonts/iconfont.css`, `src/components/layout/head/fonts-preload.html` — усі порожні від початкового коміту.
10. **Іконковий спрайт (`spritemap.scss`) — з демо іншого проєкту** (e-commerce-орієнтовані іконки: `bank-note`, `delivery`, `discount-star`, `shopping_cart_icon`, `"Outlet logo"` тощо), жодна не використовується у поточній верстці — перед версткою нових секцій знадобиться новий набір іконок під психологічну тематику.
11. **`hero-img.jpg` не оптимізоване** — 2.9 МБ у робочій копії; білд-пайплайн вміє стискати/генерувати WebP/AVIF автоматично (`images.optimize.enable: true`, `modernformat: webp`), але це станеться лише під час `vite build`, який не запускався.
12. **`src/pug/`** (2 рядки `include`) — нежиттєздатний залишок, не підключений до жодної точки збірки (`pug.enable: false`), варто або доробити, або прибрати при рефакторингу, щоб не вводити в оману.
13. **Layout `templates/inner/inner.html`** підготовлений (header + `.inner{main+aside}` + footer), але жодна сторінка його ще не використовує — знадобиться для майбутніх внутрішніх сторінок багатосторінкового сайту (блог, окремі послуги тощо).
14. **Точка входу сторінок для Vite** — це важливо для планування багатосторінковості: рушій підхоплює як окремі сторінки лише файли **прямо в `src/*.html`** (`globSync('./src/*.html')` у `vite.config.js`). Зараз там лише `index.html`. Нові сторінки багатосторінкового сайту потрібно буде додавати саме туди (з підключенням layout `main.html`/`inner.html` і потрібного партиалу з `src/components/pages/...`), а не просто класти файли в `src/components/pages/`.

---

### Підсумок для планування рефакторингу

- Стек підтверджено: **Vite + власний PostHTML-шаблонізатор FLS Start (не Nunjucks/Pug/PHP) + SCSS**. Nunjucks/Pug/PHP/React/Vue підключені в конфізі "на випадок", але фактично вимкнені/не використовуються.
- Реально написаний проєктний контент: `header.html/scss` (з незавершеною логікою sticky), `menu.html/scss` + `menu.js` (не підключений до бандла), `button.html/scss` (з бракуючими CSS-змінними), `home.html/scss` (тільки Hero, стилі майже не написані), `variables.css` (кольори/типографіка, потребують узгодження).
- Все інше в `src/components/` — це готова бібліотека шаблону FLS Start (~40 компонентів), яку можна підключати за потребою під час верстки нових сторінок, а не проєктний контент, який треба зберігати "як є".
- Перед масовою версткою варто закрити технічний борг із розділу 11 (пункти 1, 2, 6, 7, 8) — інакше він розмножиться по нових сторінках.

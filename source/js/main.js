import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  handleResize(767, 'consultation-btn', 'data-mobile-text');
  handleResize(767, 'products-title', 'data-mobile-text');

  smoothScroll('.smooth-scroll');

  initializeAccordion('.accordion__button', 'accordion__button--active');

  initializeMoreTextToggle('[data-toggle="more-text"]', '.company__description--hidden');
  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

const handleResize = (vp, id, attribute) => {
  const breakpoint = window.matchMedia(`(max-width:${vp}px)`);
  const btm = document.getElementById(id);
  const btnOriginalText = btm.textContent;
  const textAttribute = btm.getAttribute(attribute);
  const text = () => {
    if (breakpoint.matches) {
      btm.textContent = textAttribute;
    } else {
      btm.textContent = btnOriginalText;
    }
  };

  window.addEventListener('resize', text);
};

const smoothScroll = (selector) => {
  const smoothScrollButtons = document.querySelectorAll(selector);

  smoothScrollButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      const targetId = event.currentTarget.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth'});
      }
    });
  });
};

const initializeAccordion = (buttonSelector, active) => {
  const accordionButtons = document.querySelectorAll(buttonSelector);

  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle(active);
      const panel = button.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
};

const initializeMoreTextToggle = (buttonSelector, hiddenContentSelector) => {
  const moreTextButton = document.querySelector(buttonSelector);
  const hiddenContents = document.querySelectorAll(hiddenContentSelector);

  moreTextButton.addEventListener('click', (event) => {
    event.preventDefault();
    hiddenContents.forEach((content) => {
      content.classList.toggle('company__description--hidden');

      if (content.classList.contains('company__description--hidden')) {
        moreTextButton.textContent = 'Подробнее';
      } else {
        moreTextButton.textContent = 'Свернуть';
      }
    });
  });
};

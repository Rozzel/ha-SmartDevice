import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initPhoneInput} from './modules/form-validate/init-phone-input';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  handleResize(767, 'consultation-btn', 'data-mobile-text');
  handleResize(767, 'products-title', 'data-mobile-text');

  smoothScroll('.smooth-scroll');

  initializeAccordion('.accordion__button', 'accordion__button--active');

  initMoreTextToggle('.company__container', 'company__description--hidden', 2, '[data-toggle="more-text"]');

  checkingPhoneInput('.popup-question__form');
  checkingPhoneInput('.feedback__form');

  focusFormName('.header__btn', 'input[name="popup-name"]');
  focusFormName('.cover__btn', 'input[name="feedback-name"]');

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
  const btm = document.getElementById(id);

  if (btm) {
    const breakpoint = window.matchMedia(`(max-width:${vp}px)`);
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
  }
};

const smoothScroll = (selector) => {
  const smoothScrollButtons = document.querySelectorAll(selector);

  if (smoothScrollButtons.length > 0) {
    smoothScrollButtons.forEach((button) => {
      button.addEventListener('click', function (event) {
        const targetId = event.currentTarget.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({behavior: 'smooth'});
        }
      });
    });
  }
};

const initializeAccordion = (buttonSelector, buttonActive) => {
  const accordionButtons = document.querySelectorAll(buttonSelector);

  if (accordionButtons.length > 0) {
    accordionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        accordionButtons.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove(buttonActive);
            const otherPanel = otherButton.nextElementSibling;
            otherPanel.style.maxHeight = null;
          }
        });

        button.classList.toggle(buttonActive);

        const panel = button.nextElementSibling;

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    });
  }
};

const initMoreTextToggle = (containerSelector, contentSelector, contentRange, buttonSelector) => {
  const container = document.querySelector(containerSelector);

  if (container) {
    const paragraphs = container.querySelectorAll('p');
    const moreTextButton = container.querySelector(buttonSelector);

    const paragraphToggle = () => {
      paragraphs.forEach((paragraph, index) => {
        if (index >= contentRange) {
          paragraph.classList.toggle(contentSelector);
        }
      });
    };

    paragraphToggle();

    let flag = false;
    moreTextButton.addEventListener('click', (event) => {
      event.preventDefault();

      paragraphToggle();

      if (!flag) {
        moreTextButton.textContent = 'Свернуть';
      } else {
        moreTextButton.textContent = 'Подробнее';
      }

      flag = !flag;
    });
  }
};

const checkingPhoneInput = (element) => {
  const selectPhoneInput = document.querySelector(element);
  if (selectPhoneInput) {
    initPhoneInput(selectPhoneInput);
  }
};

const focusFormName = (buttonSelector, inputSelector) => {
  const openModalButtons = document.querySelectorAll(buttonSelector);
  const inputElement = document.querySelector(inputSelector);

  if (openModalButtons.length > 0 && inputElement) {
    openModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          inputElement.focus();
        }, 1000);
      });
    });
  }
};

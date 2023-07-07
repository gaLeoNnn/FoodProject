/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculator)
/* harmony export */ });
function calculator() {
  const result = document.querySelector(".calculating__result span");

  let gender, height, weight, age, ratio;

  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
  } else {
    gender = "female";
    localStorage.setItem("gender", gender);
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", ratio);
  }

  function initLocalStorage(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((item) => {
      item.classList.remove(activeClass);
      if (item.getAttribute("id") === localStorage.getItem("gender")) {
        item.classList.add(activeClass);
      }
      if (item.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        item.classList.add(activeClass);
      }
    });
  }

  initLocalStorage("#gender div", "calculating__choose-item_active");
  initLocalStorage(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "_____";
      return;
    }

    if (gender === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInform(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          gender = e.target.getAttribute("id");
          localStorage.setItem("gender", e.target.getAttribute("id"));
        }

        elements.forEach((item) => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInform("#gender div", "calculating__choose-item_active");
  getStaticInform(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getInputInform(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (isNaN(input.value)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getInputInform("#height");
  getInputInform("#weight");
  getInputInform("#age");
}


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, discr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.discr = discr;
      this.price = price;
      this.transfer = 450;
      this.changeToKZT();
    }
    changeToKZT() {
      this.price = this.transfer * this.price;
    }

    render() {
      const div = document.createElement("div");
      if (this.classes.length === 0) {
        (this.element = "menu__item"), div.classList.add(this.element);
      } else {
        this.classes.forEach((className) => div.classList.add(className));
      }

      div.innerHTML = `<img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
             ${this.discr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
            </div>`;
      this.parent.append(div);
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)("http://localhost:3000/menu").then((data) =>
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    })
  );
}


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



function forms(formSelector, modalTimerID) {
  ///Post request
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "./img/form/spinner.svg",
    success: "Спасибо скоро свяжемся",
    faluire: "что то пощло не так",
  };

  forms.forEach((form) => {
    bindPostReq(form);
  });

  function bindPostReq(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto`;
      form.insertAdjacentElement("afterend", statusMessage); /// вставить после form блока

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postReq)("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.faluire);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector(".modal__dialog");
    modalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerID);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `<div class="modal__content"> 
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>`;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.add("show");
      modalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
}


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (/* binding */ modal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}



function modal(selector, modalSelector) {
  const btns = document.querySelectorAll(selector),
    modal = document.querySelector(modalSelector);

  btns.forEach((item) => {
    item.addEventListener("click", () => openModal(modalSelector));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}


/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourse: () => (/* binding */ getResourse),
/* harmony export */   postReq: () => (/* binding */ postReq)
/* harmony export */ });
const postReq = async (url, obj) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: obj,
  });
  return await res.json();
};

const getResourse = async (url) => {
  const res = await fetch(url);
  return await res.json();
};




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider() {
  /// SLIDER
  const wrapper = document.querySelector(".offer__slider-wrapper"),
    slides = document.querySelectorAll(".offer__slide"),
    inner = document.querySelector(".offer__slider-inner"),
    btnPrev = document.querySelector(".offer__slider-prev"),
    btnNext = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    parentWidth = wrapper.offsetWidth;
  //dots
  const parentAbsolute = document.querySelector(".offer__slider"),
    wrapperDots = document.createElement("ol"),
    dots = [];

  inner.style.width = `${parentWidth * slides.length}px`;
  inner.style.display = "flex";
  inner.style.transition = "0.5s all";

  slides.forEach((slide) => {
    slide.style.width = parentWidth + "px";
  });

  wrapper.style.overflow = "hidden";

  let index = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${index}`;
  } else {
    total.textContent = slides.length;
    current.textContent = index;
  }

  function setCurrentSlide() {
    if (index < 10) {
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }
  }

  function setDots(n) {
    dots.forEach((dot) => {
      dot.style.opacity = 0.5;
      dots[n - 1].style.opacity = 1;
    });
  }

  btnNext.addEventListener("click", () => {
    if (offset === parentWidth * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parentWidth;
    }
    inner.style.transform = `translateX(${-offset}px)`;

    if (slides.length === index) {
      index = 1;
    } else {
      index++;
    }

    setCurrentSlide();
    setDots(index);
  });

  btnPrev.addEventListener("click", () => {
    if (offset == 0) {
      offset = parentWidth * (slides.length - 1);
    } else {
      offset -= parentWidth;
    }
    inner.style.transform = `translateX(${-offset}px)`;

    if (index === 1) {
      index = slides.length;
    } else {
      index--;
    }

    setCurrentSlide();
    setDots();
  });

  parentAbsolute.style.position = "relative";

  wrapperDots.style.cssText = `
   position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  parentAbsolute.append(wrapperDots);

  slides.forEach((slide, index) => {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", index + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

    wrapperDots.append(dot);
    dots.push(dot);
  });

  setDots(index);

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const number = e.target.getAttribute("data-slide-to");
      index = number;
      setCurrentSlide();
      setDots(number);
      offset = parentWidth * (number - 1);
      inner.style.transform = `translateX(${-offset}px)`;
    });
  });
}


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs() {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => item.classList.remove("tabheader__item_active"));
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.remove("hide");
    tabContent[i].classList.add("show", "fade");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    console.log(e);
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, index) => {
        if (item === e.target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer() {
  const endTime = "2025-07-01";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    updateClock(); /// для моментального первого запуска
    const timeInterval = setInterval(updateClock, 1000);
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", endTime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener("DOMContentLoaded", () => {
  const modalTimerID = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)(".modal", modalTimerID),
    40000
  );

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])("[data-modal]", ".modal");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("form", modalTimerID);
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
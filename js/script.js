window.addEventListener("DOMContentLoaded", () => {
  //Tabs
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

  //Timer

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

  //Modal

  const btns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }

  btns.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 40000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

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

  const getResourse = async (url) => {
    const res = await fetch(url);
    return await res.json();
  };

  getResourse("http://localhost:3000/menu").then((data) =>
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

  ///Post request
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "./img/form/spinner.svg",
    success: "Спасибо скоро свяжемся",
    faluire: "что то пощло не так",
  };

  forms.forEach((form) => {
    bindPostReq(form);
  });

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

      postReq("http://localhost:3000/requests", json)
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
    openModal();

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
      closeModal();
    }, 4000);
  }

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
});

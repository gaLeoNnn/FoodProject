export default function slider() {
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

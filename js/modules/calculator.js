export default function calculator() {
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

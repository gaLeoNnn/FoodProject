import { getResourse } from "./services/services";

export default function cards() {
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
}

export default function tabs() {
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

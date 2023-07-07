import tabs from "./modules/tabs";
import calculator from "./modules/calculator";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerID = setTimeout(
    () => openModal(".modal", modalTimerID),
    40000
  );

  tabs();
  modal("[data-modal]", ".modal");
  timer();
  slider();
  cards();
  forms("form", modalTimerID);
  calculator();
});

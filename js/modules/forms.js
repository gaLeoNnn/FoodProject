import { openModal, closeModal } from "./modal";
import { postReq } from "./services/services";

export default function forms(formSelector, modalTimerID) {
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
    openModal(".modal", modalTimerID);

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
      closeModal(".modal");
    }, 4000);
  }
}

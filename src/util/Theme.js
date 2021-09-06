import { disableScroll, enableScroll } from "./preventScroll"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
export default function Theme() {
  document.getElementById("close-modal").addEventListener("click", closeModal)
  function closeModal() {
    enableScroll()
    const modal = document.getElementById("modal-error")
    const modalBody = document.getElementById("modal-body")
    modal.classList.toggle("scale-0")
    modal.classList.toggle("scale-100")
    modalBody.innerHTML = ""
  }

  const modalInfo = document.getElementById("modal-info")
  const modalInfoBody = document.getElementById("modal-info__body")

  modalInfo.addEventListener("click", (e) => {
    if (e.target.id === "modal-info" || e.target.id === "close__modal-info") {
      closeModalInfo()
    }
  })

  function closeModalInfo() {
    modalInfoBody.classList.toggle("translate-y-0")
    modalInfoBody.classList.toggle("-translate-y-full")
    modalInfoBody.classList.toggle("scale-0")
    setTimeout(() => {
      modalInfo.classList.toggle("hidden")
      modalInfo.classList.toggle("grid")
      enableScroll()
    }, 125)
  }

  const infoBtn = document.querySelector(".header__info-icon")
  infoBtn.addEventListener("click", () => {
    modalInfo.classList.toggle("hidden")
    modalInfo.classList.toggle("grid")
    disableScroll()
    setTimeout(() => {
      modalInfoBody.classList.toggle("translate-y-0")
      modalInfoBody.classList.toggle("-translate-y-full")
      modalInfoBody.classList.toggle("scale-0")
    }, 125)
  })

  // const symptoms = [
  //   "Fever or chills",
  //   "Cough",
  //   "Shortness of breath or difficulty breathing",
  //   "Fatigue",
  //   "Muscle or body aches",
  //   "Headache",
  //   "New loss of taste or smell",
  //   "Sore throat",
  //   "Congestion or runny nose",
  //   "Nausea or vomiting",
  //   "Diarrhea",
  // ]
  // const symptomList = document.getElementById("symptom__list")

  // for (const symptom of symptoms) {
  // }
}

export function animationElement() {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(".hero__animate", {
    scrollTrigger: ".hero__animate",
    opacity: 0,
    x: -50,
    stagger: 0.3,
    transitionDuration: 0.9,
    delay: 0.5,
    transitionProperty: "ease",
  })
  gsap.from(".header__head", {
    scrollTrigger: ".header__head",
    opacity: 0,
    x: -100,
    transitionDuration: 0.4,
    transitionProperty: "ease",
  })
  gsap.from(".header__info-icon", {
    scrollTrigger: ".header__info-icon",
    opacity: 0,
    x: 100,
    transitionDuration: 0.4,
    transitionProperty: "ease",
  })
  gsap.from(".hero__section-image", {
    scrollTrigger: ".hero__section-image",
    opacity: 0,
    y: 50,
    transitionDuration: 0.9,
    delay: 1.2,
    transitionProperty: "ease",
  })
  gsap.from(".covid__section-head", {
    scrollTrigger: ".covid__section-head",
    opacity: 0,
    y: 100,
    transitionDuration: 0.4,
    transitionProperty: "ease-in",
  })
  gsap.from(".card__animate", {
    scrollTrigger: ".card__animate",
    opacity: 0,
    y: 50,
    stagger: 0.3,
    delay: 0.5,
    transitionDuration: 0.9,
    transitionProperty: "ease",
  })
  gsap.from(".canvas__parent", {
    scrollTrigger: ".canvas__parent",
    opacity: 0,
    y: 50,
    stagger: 0.3,
    delay: 0.5,
    transitionDuration: 0.9,
    transitionProperty: "ease",
  })
  gsap.from("footer", {
    scrollTrigger: "footer",
    opacity: 0,
    delay: 1,
    y: 30,
    transitionDuration: 0.4,
    transitionProperty: "ease-in",
  })
}

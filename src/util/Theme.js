export default function Theme() {
  document.getElementById("close-modal").addEventListener("click", closeModal)
  function closeModal() {
    const modal = document.getElementById("modal-error")
    const modalBody = document.getElementById("modal-body")
    modal.classList.toggle("scale-0")
    document.body.classList.toggle("overflow-y-hidden")
    modal.classList.toggle("scale-100")
    modalBody.innerHTML = ""
  }
}

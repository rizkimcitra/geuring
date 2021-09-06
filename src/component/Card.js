// Membuat custom element
class Card extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define("card-item", Card)

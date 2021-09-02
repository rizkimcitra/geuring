class Card extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback(id) {
    this.setAttribute("id", id)
  }
  attributeChangedCallback(name, oldVal, newVal) {}
}

customElements.define("card-item", Card)

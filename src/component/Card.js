class Card extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {}
  attributeChangedCallback(name, oldVal, newVal) {}
}

customElements.define("card-item", Card)

/**
 * @classdesc A component in which users can create their own cookbook-cards.
 */
class cookbookCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/cookbook-card.css";

    const navbar = document.getElementById("cookbook-card-template").content;

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(navbar);
  }
}

customElements.define("cookbook-card", cookbookCard);

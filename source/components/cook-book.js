/**
 * @classdesc A component in which users can create their own cookbook view page.
 */
class cookbook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/cook-book.css";

    const navbar = document
      .getElementById("cook-book-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(navbar);
  }
}

customElements.define("cook-book", cookbook);

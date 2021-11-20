/**
 * @classdesc A component for the home page (default load).
 *
 */
class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/home-page.css";

    const home = document
      .getElementById("home-page-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(home);
  }
}

customElements.define("home-page", HomePage);

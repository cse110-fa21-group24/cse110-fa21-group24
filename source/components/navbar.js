/**
 * @classdesc A custom element which contains Home, Explore, and My Cookbooks
 *            navigation buttons
 */
class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/navbar.css";

    const navbar = document
      .getElementById("navbar-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(navbar);
  }
}

customElements.define("custom-navbar", Navbar);

/**
 * @classdesc A component that contains the HTML for the single-cookbook
 *            view where users can look at the recipes in their cookbook.
 *
 */
class SingleCookbook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/single-cookbook.css";

    const singleCookbook = document
      .getElementById("single-cookbook-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(singleCookbook);
  }
}

customElements.define("single-cookbook", SingleCookbook);

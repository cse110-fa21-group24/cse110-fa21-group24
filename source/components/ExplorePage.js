/**
 * @classdesc A navbar custom element which contains Home, Explore, and My
 *            Cookbooks navigation buttons
 */
class ExplorePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/explore-page.css";

    const explore = document.getElementById("explore-page-template").content;

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(explore);
  }
}

customElements.define("explore-page", ExplorePage);

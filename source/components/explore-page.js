/**
 * @classdesc A component for the explore page where users can view
 *            random recipes or recipes they search for.
 *
 */
class ExplorePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/explore-page.css";

    const explore = document
      .getElementById("explore-page-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(explore);
  }
}

customElements.define("explore-page", ExplorePage);

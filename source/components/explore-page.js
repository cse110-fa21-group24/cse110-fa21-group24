/**
 * @classdesc A component where users can search for recipes by giving key words
 *            and criterias or view randomly generated recipes
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

  set numResults(totalResults) {
    this.internNumResults = totalResults;
  }

  get numResults() {
    return this.internNumResults;
  }
}

customElements.define("explore-page", ExplorePage);

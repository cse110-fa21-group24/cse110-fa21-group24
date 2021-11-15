/**
 * @classdesc A recipe card component to be used in the Cookbook Page.
 *            This component includes a delete button.
 */
class RecipeCardDelete extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/RCCdelstyle.css";

    const recipeCard = document
      .getElementById("recipe-card-delete-template")
      .cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeCard);
  }
}

customElements.define("recipe-card-delete", RecipeCardDelete);

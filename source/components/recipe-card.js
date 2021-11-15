/**
 * @classdesc A recipe card component to be used in the Explore page
 *            and in the Home page. This component does not include
 *            the delete button.
 */
class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/recipe-card.css";

    const recipeCard = document
      .getElementById("recipe-card-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeCard);
  }
}

customElements.define("recipe-card", RecipeCard);

/**
 * @classdesc A recipe card component to be used in the Cookbook Page.
 *            This component includes a delete button.
 */
class RecipeCardDelete extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the recipe object for a given card and sets up content
   */
  set recipe(recipeObj) {
    if (!recipeObj) {
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/recipe-card-delete.css";

    const recipeCard = document
      .getElementById("recipe-card-delete-template")
      .content.cloneNode(true);

    // store object for access later
    this.recipeObj = recipeObj;

    // set up card content
    let titleText = recipeCard.querySelector("h1");
    titleText.textContent = recipeObj.title;

    let descriptionText = recipeCard.querySelector(".description");
    descriptionText.innerHTML = recipeObj.description;

    let image = recipeCard.querySelector("img");
    image.src = recipeObj.image;

    // add to element
    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeCard);
  }

  get recipe() {
    return this.recipeObj;
  }
}

customElements.define("recipe-card-delete", RecipeCardDelete);

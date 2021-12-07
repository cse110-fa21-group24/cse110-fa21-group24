/**
 * @classdesc A recipe card that shows some preview info about a recipe
 */
export class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/recipe-card.css";

    const recipeCard = document
      .getElementById("recipe-card-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeCard);
  }

  set recipe(recipeObj) {
    this.internalRecipe = recipeObj;
  }

  get recipe() {
    return this.internalRecipe;
  }

  set recipeId(newRecipeId) {
    this.internalRecipeId = newRecipeId;
  }

  get recipeId() {
    return this.internalRecipeId;
  }

  set recipeKey(newRecipeKey) {
    this.internalRecipeKey = newRecipeKey;
  }

  get recipeKey() {
    return this.internalRecipeKey;
  }

  set cookbookTitle(newCookbookTitle) {
    this.internalCookbookTitle = newCookbookTitle;
  }

  get cookbookTitle() {
    return this.internalCookbookTitle;
  }

  /**
   * Populate the recipe card with some recipe preview info
   * @param {object} recipeObj An object containing a title and an image to
   *                           preview on the recipe card and, possibly, the
   *                           corresponding recipe ID
   * @param {boolean} fromSpoonacular If fromSpoonacular is true, then the
   *                                  recipeObj came from Spoonacular, otherwise,
   *                                  it will be inferred that the recipeObj came
   *                                  from another source besides Spoonacular
   */
  populateRecipeCard(recipeObj, fromSpoonacular) {
    let shadow = this.shadowRoot;

    if (fromSpoonacular) {
      this.recipeId = recipeObj.id;
      shadow
        .getElementById("recipe-card-delete-button")
        .classList.add("hide-recipe-card-part");
      shadow.getElementById("recipe-info").textContent = "Learn More";
    } else {
      this.recipeId = undefined;
      shadow
        .getElementById("recipe-card-add-button")
        .classList.add("hide-recipe-card-part");
      shadow.getElementById("recipe-info").textContent = "Open";
    }

    shadow.getElementById("recipe-card-title").textContent = recipeObj.title;
    shadow.getElementById("recipe-card-image").src = recipeObj.image;
  }
}

customElements.define("recipe-card", RecipeCard);

/**
 * @classdesc A template for the recipe form which allows users to edit
 *            their recipes and their details.
 *
 */
export class RecipeForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/recipe-form.css";

    const recipeForm = document
      .getElementById("recipe-form-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeForm);
  }

  set recipe(recipeObj) {
    this.internalRecipe = recipeObj;
  }

  get recipe() {
    return this.internalRecipe;
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
   * Pre-fill the recipe edit form with all the changeable fields of a recipe
   * @param {object} recipeObj An object containing all the necessary properties
   *                           that would show up in the recipe page
   */
  populateRecipeForm(recipeObj) {
    let shadow = this.shadowRoot;
    this.recipe = recipeObj;

    // Pre-fill the recipe title and description
    shadow.getElementById("edit-title-input").value = recipeObj.title;
    shadow.getElementById("edit-description-input").value =
      recipeObj.description;

    // Clear ingredients section
    let ingredientsList = shadow.getElementById("ingredients-list-container");

    while (ingredientsList.children[ingredientsList.children.length - 2]) {
      ingredientsList.removeChild(ingredientsList.firstChild);
    }

    let addIngredientButton = shadow.getElementById("add-ingredient-button");

    // Pre-fill the recipe ingredients
    for (let i = 0; i < recipeObj.ingredients.length; ++i) {
      // Build the ingredient container
      let ingredientContainer = document.createElement("div");
      ingredientContainer.classList.add("edit-ingredient-item");
      addIngredientButton.before(ingredientContainer);

      // Build the amount field
      let amountField = document.createElement("input");
      amountField.type = "text";
      amountField.classList.add("edit-ingredient-amount-input");
      amountField.placeholder = "0";
      amountField.value = recipeObj.ingredients[i].amount;
      ingredientContainer.append(amountField);

      // Build the units field
      let unitField = document.createElement("input");
      unitField.type = "text";
      unitField.classList.add("edit-ingredient-unit-input");
      unitField.placeholder = "unit";
      unitField.value = recipeObj.ingredients[i].unit;
      ingredientContainer.append(unitField);

      // Build the ingredient name field
      let ingredientName = document.createElement("input");
      ingredientName.type = "text";
      ingredientName.classList.add("edit-ingredient-name-input");
      ingredientName.placeholder = "Ingredient name";
      ingredientName.value = recipeObj.ingredients[i].name;
      ingredientContainer.append(ingredientName);

      // Build the recycle bin button
      let recycleBin = document.createElement("button");
      recycleBin.type = "button";
      recycleBin.classList.add("recycle-bin-button");

      let recycleBinImage = document.createElement("img");
      recycleBinImage.classList.add("recycle-bin-icon");
      recycleBinImage.src = "images/recycle-bin.png";
      recycleBinImage.alt = "recycle-bin";

      recycleBin.append(recycleBinImage);
      ingredientContainer.append(recycleBin);
    }

    // Clear instructions section
    let instructionsList = shadow.getElementById("edit-instructions-list");
    instructionsList.innerHTML = "";

    // Pre-fill the recipe instructions
    for (let i = 0; i < recipeObj.instructions.length; ++i) {
      // Build the instructions container
      let instructionContainer = document.createElement("div");
      instructionContainer.classList.add("edit-instruction-item");
      instructionsList.append(instructionContainer);

      // Build the instruction number
      let number = document.createElement("li");
      number.classList.add("edit-instruction-number");
      instructionContainer.append(number);

      // Build the instruction content container
      let content = document.createElement("div");
      content.classList.add("edit-instruction-content");
      instructionContainer.append(content);

      // Build the instruction field
      let instructionField = document.createElement("textarea");
      instructionField.classList.add("edit-instruction-input");
      instructionField.placeholder = "Instruction";
      instructionField.value = recipeObj.instructions[i];
      content.append(instructionField);

      // Build the recycle bin button
      let recycleBin = document.createElement("button");
      recycleBin.type = "button";
      recycleBin.classList.add("recycle-bin-button");

      let recycleBinImage = document.createElement("img");
      recycleBinImage.classList.add("recycle-bin-icon");
      recycleBinImage.src = "images/recycle-bin.png";
      recycleBinImage.alt = "recycle-bin";

      recycleBin.append(recycleBinImage);
      content.append(recycleBin);
    }
  }

  getEditedRecipe() {}
}

customElements.define("recipe-form", RecipeForm);

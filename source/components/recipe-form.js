/**
 * @classdesc A template for the recipe form which allows users to edit
 *            a recipe in their cookbook and their details.
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

    // We do not want to remove the last child of the ingredients list, which
    // is actually the Add Ingredient button
    while (ingredientsList.children[ingredientsList.children.length - 2]) {
      ingredientsList.removeChild(ingredientsList.firstChild);
    }

    // Pre-fill the recipe ingredients
    for (let i = 0; i < recipeObj.ingredients.length; ++i) {
      this.addIngredient(
        recipeObj.ingredients[i].amount,
        recipeObj.ingredients[i].unit,
        recipeObj.ingredients[i].name
      );
    }

    // Clear instructions section
    let instructionsList = shadow.getElementById("edit-instructions-list");
    instructionsList.innerHTML = "";

    // Pre-fill the recipe instructions
    for (let i = 0; i < recipeObj.instructions.length; ++i) {
      this.addInstruction(recipeObj.instructions[i]);
    }
  }

  /**
   * Adds a new ingredient to the recipe form
   * @param {number} amount The number of units of an ingredient
   * @param {string} unit The unit of measurement of the ingredient
   * @param {string} name The name of the ingredient
   */
  addIngredient(amount, unit, name) {
    let shadow = this.shadowRoot;
    let addIngredientButton = shadow.getElementById("add-ingredient-button");

    // Build the ingredient container
    let ingredientContainer = document.createElement("div");
    ingredientContainer.classList.add("edit-ingredient-item");
    addIngredientButton.before(ingredientContainer);

    // Build the amount field
    let amountField = document.createElement("input");
    amountField.type = "number";
    amountField.classList.add("edit-ingredient-amount-input");
    amountField.placeholder = "0";
    amountField.value = amount;
    ingredientContainer.append(amountField);

    // Build the units field
    let unitField = document.createElement("input");
    unitField.type = "text";
    unitField.classList.add("edit-ingredient-unit-input");
    unitField.placeholder = "unit";
    unitField.value = unit;
    ingredientContainer.append(unitField);

    // Build the ingredient name field
    let ingredientName = document.createElement("input");
    ingredientName.type = "text";
    ingredientName.classList.add("edit-ingredient-name-input");
    ingredientName.placeholder = "Ingredient name";
    ingredientName.value = name;
    ingredientContainer.append(ingredientName);

    // Build the recycle bin button
    let recycleBin = document.createElement("button");
    recycleBin.type = "button";
    recycleBin.classList.add("recycle-bin-button");
    recycleBin.classList.add("ingredient-recycle-bin");

    let recycleBinImage = document.createElement("img");
    recycleBinImage.classList.add("recycle-bin-icon");
    recycleBinImage.classList.add("ingredient-recycle-bin");
    recycleBinImage.src = "images/recycle-bin.png";
    recycleBinImage.alt = "recycle-bin";

    recycleBin.append(recycleBinImage);
    ingredientContainer.append(recycleBin);
  }

  /**
   * Adds a new instruction to the recipe form
   * @param {string} instruction A single recipe instruction
   */
  addInstruction(instruction) {
    let shadow = this.shadowRoot;
    let instructionsList = shadow.getElementById("edit-instructions-list");

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
    instructionField.value = instruction;
    content.append(instructionField);

    // Build the recycle bin button
    let recycleBin = document.createElement("button");
    recycleBin.type = "button";
    recycleBin.classList.add("recycle-bin-button");
    recycleBin.classList.add("instruction-recycle-bin");

    let recycleBinImage = document.createElement("img");
    recycleBinImage.classList.add("recycle-bin-icon");
    recycleBinImage.classList.add("instruction-recycle-bin");
    recycleBinImage.src = "images/recycle-bin.png";
    recycleBinImage.alt = "recycle-bin";

    recycleBin.append(recycleBinImage);
    content.append(recycleBin);
  }

  /**
   * Removes an ingredient from the recipe form
   * @param {Element} recycleBin The recycle bin that triggered the deletion
   */
  deleteIngredient(recycleBin) {
    let parent = recycleBin.parentElement;

    while (!parent.classList.contains("edit-ingredient-item")) {
      parent = parent.parentElement;
    }

    parent.remove();
  }

  /**
   * Removes an instruction from the recipe form
   * @param {Element} recycleBin The recycle bin that triggered the deletion
   */
  deleteInstruction(recycleBin) {
    let parent = recycleBin.parentElement;

    while (!parent.classList.contains("edit-instruction-item")) {
      parent = parent.parentElement;
    }

    parent.remove();
  }

  /**
   * Gets the updated recipe info
   * @returns {object} An object containing a recipe with the updated recipe
   *                   info that was changed in the recipe form
   */
  getEditedRecipe() {
    let shadow = this.shadowRoot;
    let updatedRecipe = this.recipe;

    // Get the updated recipe title and description
    updatedRecipe.title = shadow.getElementById("edit-title-input").value;
    updatedRecipe.description = shadow.getElementById(
      "edit-description-input"
    ).value;

    // Get the updated ingredients
    let newIngredients = [];
    let updatedIngredients = shadow.getElementById(
      "ingredients-list-container"
    ).children;

    // We do not want to access the last child of the ingredients list since
    // the last child is actually the Add Ingredient button
    for (let i = 0; i < updatedIngredients.length - 1; ++i) {
      let ingredient = {};

      ingredient.amount = Number(
        updatedIngredients[i].querySelector(".edit-ingredient-amount-input")
          .value
      );
      ingredient.unit = updatedIngredients[i].querySelector(
        ".edit-ingredient-unit-input"
      ).value;
      ingredient.name = updatedIngredients[i].querySelector(
        ".edit-ingredient-name-input"
      ).value;

      newIngredients.push(ingredient);
    }

    updatedRecipe.ingredients = newIngredients;

    // Get the updated instructions
    let newInstructions = [];
    let updatedInstructions = shadow.getElementById(
      "edit-instructions-list"
    ).children;

    for (let i = 0; i < updatedInstructions.length; ++i) {
      let instruction = updatedInstructions[i].querySelector(
        ".edit-instruction-input"
      ).value;
      newInstructions.push(instruction);
    }

    updatedRecipe.instructions = newInstructions;

    return updatedRecipe;
  }
}

customElements.define("recipe-form", RecipeForm);

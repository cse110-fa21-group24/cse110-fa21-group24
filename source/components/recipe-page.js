/**
 * @classdesc This class represents the recipe page, which is used for
 *            displaying detailed info about an open recipe
 *
 */
export class RecipePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/recipe-page.css";

    const recipePage = document
      .getElementById("recipe-page-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipePage);
  }

  set recipeId(newRecipeId) {
    this.internalRecipeId = newRecipeId;
  }

  get recipeId() {
    return this.internalRecipeId;
  }

  set recipe(recipeObj) {
    this.internalRecipe = recipeObj;
  }

  get recipe() {
    return this.internalRecipe;
  }

  /**
   * Populate the recipe page with all the necessary recipe information
   * @param {object} recipeObj An object containing all the necessary properties
   *                           that would show up in the recipe page
   * @param {boolean} fromSpoonacular If fromSpoonacular is true, then the
   *                                  recipeObj came from Spoonacular, otherwise,
   *                                  it will be inferred that the recipeObj came
   *                                  from another source besides Spoonacular
   */
  populateRecipePage(recipeObj, fromSpoonacular) {
    let shadow = this.shadowRoot;
    this.recipe = recipeObj;

    if (fromSpoonacular) {
      this.recipeId = recipeObj.id;
    } else {
      this.recipeId = undefined;
    }

    shadow.getElementById("recipe-title").textContent = recipeObj.title;
    shadow.getElementById("recipe-author").textContent =
      "Recipe by: " + recipeObj.author;

    let cuisineTag = shadow.getElementById("recipe-cuisine");

    switch (recipeObj.cuisines.length) {
      case 0:
        cuisineTag.classList.add("hide-recipe-part");
        break;
      case 1:
        cuisineTag.textContent = "Cuisine: " + recipeObj.cuisines[0];
        break;
      default:
        cuisineTag.textContent =
          "Cuisines: " + recipeObj.cuisines[0] + ", " + recipeObj.cuisines[1];
    }

    if (recipeObj.readyInMinutes === 0) {
      shadow
        .getElementById("recipe-ready-in")
        .classList.add("hide-recipe-part");
    } else {
      shadow.getElementById("recipe-ready-in").textContent =
        "Ready In: " + recipeObj.readyInMinutes + " min";
    }

    let actionPlus = shadow.getElementById("recipe-action-image-plus");
    let actionPencil = shadow.getElementById("recipe-action-image-pencil");
    let actionText = shadow.getElementById("recipe-action-text");

    if (fromSpoonacular) {
      actionPlus.classList.remove("hide-recipe-part");
      actionPencil.classList.add("hide-recipe-part");
      actionText.textContent = "Add to Cookbook";
    } else {
      actionPlus.classList.add("hide-recipe-part");
      actionPencil.classList.remove("hide-recipe-part");
      actionText.textContent = "Edit Recipe";
    }

    shadow.getElementById("recipe-image").src = recipeObj.image;
    shadow.getElementById("recipe-description").innerHTML =
      recipeObj.description;

    let ingredientAmounts = [];
    let ingredientsLeft = shadow.getElementById(
      "recipe-ingredients-section-left"
    );
    let ingredientsRight = shadow.getElementById(
      "recipe-ingredients-section-right"
    );
    ingredientsLeft.innerHTML = "";
    ingredientsRight.innerHTML = "";

    for (let i = 0; i < recipeObj.ingredients.length; ++i) {
      let item = document.createElement("div");
      item.classList.add("ingredient-item");

      let ingredientLabel = document.createElement("label");
      let ingredientCheckbox = document.createElement("input");

      ingredientAmounts.push(recipeObj.ingredients[i].amount);

      ingredientCheckbox.type = "checkbox";
      ingredientCheckbox.classList.add("ingredient-checkbox");
      ingredientLabel.textContent =
        recipeObj.ingredients[i].amount +
        " " +
        recipeObj.ingredients[i].unit +
        " " +
        recipeObj.ingredients[i].name;

      item.appendChild(ingredientCheckbox);
      item.appendChild(ingredientLabel);

      if (i % 2 === 0) {
        ingredientsLeft.append(item);
      } else {
        ingredientsRight.append(item);
      }
    }

    this.ingredientAmounts = ingredientAmounts;

    let instructionsList = shadow.getElementById("instructions-list");
    instructionsList.innerHTML = "";

    for (let i = 0; i < recipeObj.instructions.length; ++i) {
      let instruction = document.createElement("li");
      instruction.classList.add("instruction-item");
      instruction.textContent = recipeObj.instructions[i];
      instructionsList.append(instruction);
    }
  }

  /**
   * Scale the ingredient amounts on the recipe page by a specified factor
   * @param {number} scaleFactor The factor to multiply the original ingredient
   *                             amounts by
   */
  scaleIngredientAmounts(scaleFactor) {
    let shadow = this.shadowRoot;
    let originalIngredients = this.recipe.ingredients;

    let ingredientsLeft = shadow.getElementById(
      "recipe-ingredients-section-left"
    ).children;
    let ingredientsRight = shadow.getElementById(
      "recipe-ingredients-section-right"
    ).children;

    for (let i = 0; i < originalIngredients.length; ++i) {
      let ingredientElement = null;
      let scaledAmount = originalIngredients[i].amount * scaleFactor;

      if (i % 2 === 0) {
        ingredientElement = ingredientsLeft[i / 2];
      } else {
        ingredientElement = ingredientsRight[(i - 1) / 2];
      }

      ingredientElement.querySelector("label").textContent =
        scaledAmount +
        " " +
        originalIngredients[i].unit +
        " " +
        originalIngredients[i].name;
    }
  }
}

customElements.define("recipe-page", RecipePage);

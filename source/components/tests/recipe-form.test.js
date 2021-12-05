/**
 * @jest-environment jsdom
 */

/* jshint ignore:start */
import { RecipeForm } from "../recipe-form.js";
/* jshint ignore:end */

const RECIPE_OBJ = {
  id: 1,
  title: "title",
  author: "author",
  cuisines: ["cuisine-0", "cuisine-1"],
  readyInMinutes: 10,
  image: "images/pasta.jpg",
  description: "description",
  ingredients: [
    {
      amount: 1,
      unit: "cup",
      name: "ingredient-0",
    },
    {
      amount: 3,
      unit: "teaspoon",
      name: "ingredient-1",
    },
  ],
  instructions: ["instruction-1", "instruction-2"],
};

beforeAll(() => {
  "use strict";
  const recipeFormTemplate = document.createElement("template");
  recipeFormTemplate.id = "recipe-form-template";

  // Keep this template up to date with the corresponding template in
  // source/index.html
  recipeFormTemplate.innerHTML = `
      <p id="recipe-form-header">Edit Recipe</p>

      <div id="edit-title-box">
        <div id="edit-title-subheader-container">
          <p class="recipe-form-subheader">Title:</p>
        </div>
        <input id="edit-title-input" type="text" placeholder="Title" />
      </div>

      <div id="edit-description-box">
        <div id="edit-description-subheader-container">
          <p class="recipe-form-subheader">Description:</p>
        </div>
        <textarea
          id="edit-description-input"
          placeholder="Description"
        ></textarea>
      </div>

      <div id="edit-ingredients-box">
        <div id="edit-ingredients-subheader-container">
          <p class="recipe-form-subheader">Ingredients:</p>
        </div>
        <div id="ingredients-list-container">
          <div class="edit-ingredient-item">
            <input
              type="number"
              class="edit-ingredient-amount-input"
              placeholder="0"
            />
            <input
              type="text"
              class="edit-ingredient-unit-input"
              placeholder="unit"
            />
            <input
              type="text"
              class="edit-ingredient-name-input"
              placeholder="Ingredient name"
            />
            <button
              class="recycle-bin-button ingredient-recycle-bin"
              type="button"
            >
              <img
                class="recycle-bin-icon ingredient-recycle-bin"
                src="images/recycle-bin.png"
                alt="recycle-bin"
              />
            </button>
          </div>
          <button
            id="add-ingredient-button"
            class="recipe-form-add-button"
            type="button"
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      <div id="edit-instructions-box">
        <div id="edit-instructions-subheader-container">
          <p class="recipe-form-subheader">Instructions:</p>
        </div>
        <div id="instructions-list-container">
          <ol id="edit-instructions-list">
            <div class="edit-instruction-item">
              <li class="edit-instruction-number"></li>
              <div class="edit-instruction-content">
                <textarea
                  class="edit-instruction-input"
                  placeholder="Instruction"
                ></textarea>
                <button
                  class="recycle-bin-button instruction-recycle-bin"
                  type="button"
                >
                  <img
                    class="recycle-bin-icon instruction-recycle-bin"
                    src="images/recycle-bin.png"
                    alt="recycle-bin"
                  />
                </button>
              </div>
            </div>
          </ol>
          <button
            id="add-instruction-button"
            class="recipe-form-add-button"
            type="button"
          >
            + Add Instruction
          </button>
        </div>
      </div>

      <div id="recipe-form-save-button-container">
        <button id="recipe-form-save-button" type="button">Save Changes</button>
      </div>
      <div id="recipe-form-cancel-button-container">
        <button id="recipe-form-cancel-button" type="button">Cancel</button>
      </div>
    `;
  document.body.append(recipeFormTemplate);
});

beforeEach(() => {
  "use strict";
  let recipeForm = document.createElement("recipe-form");
  document.body.append(recipeForm);
});

afterEach(() => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  recipeForm.remove();
});

test("populate edit recipe form with recipe info", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  recipeForm.populateRecipeForm(RECIPE_OBJ);

  expect(shadow.getElementById("edit-title-input").value).toMatch("title");
  expect(shadow.getElementById("edit-description-input").value).toMatch(
    "description"
  );

  let ingredients = shadow.getElementById(
    "ingredients-list-container"
  ).children;

  expect(
    Number(ingredients[0].querySelector(".edit-ingredient-amount-input").value)
  ).toEqual(1);
  expect(
    ingredients[0].querySelector(".edit-ingredient-unit-input").value
  ).toMatch("cup");
  expect(
    ingredients[0].querySelector(".edit-ingredient-name-input").value
  ).toMatch("ingredient-0");
  expect(
    Number(ingredients[1].querySelector(".edit-ingredient-amount-input").value)
  ).toEqual(3);
  expect(
    ingredients[1].querySelector(".edit-ingredient-unit-input").value
  ).toMatch("teaspoon");
  expect(
    ingredients[1].querySelector(".edit-ingredient-name-input").value
  ).toMatch("ingredient-1");

  let instructions = shadow.getElementById("edit-instructions-list").children;

  expect(
    instructions[0].querySelector(".edit-instruction-input").value
  ).toMatch("instruction-1");
  expect(
    instructions[1].querySelector(".edit-instruction-input").value
  ).toMatch("instruction-2");
});

test("add new ingredients to the recipe form", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  let ingredients = shadow.getElementById(
    "ingredients-list-container"
  ).children;

  recipeForm.populateRecipeForm(RECIPE_OBJ);

  expect(ingredients.length - 1).toEqual(2);

  recipeForm.addIngredient(4, "bars", "chocolate");

  expect(ingredients.length - 1).toEqual(3);
  expect(
    Number(ingredients[2].querySelector(".edit-ingredient-amount-input").value)
  ).toEqual(4);
  expect(
    ingredients[2].querySelector(".edit-ingredient-unit-input").value
  ).toMatch("bars");
  expect(
    ingredients[2].querySelector(".edit-ingredient-name-input").value
  ).toMatch("chocolate");

  for (let i = 0; i < 7; ++i) {
    recipeForm.addIngredient(4, "bars", "chocolate");
  }

  expect(ingredients.length - 1).toEqual(10);
});

test("add new instructions to the recipe form", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  let instructions = shadow.getElementById("edit-instructions-list").children;

  recipeForm.populateRecipeForm(RECIPE_OBJ);

  expect(instructions.length).toEqual(2);

  recipeForm.addInstruction("mix ingredients");

  expect(instructions.length).toEqual(3);
  expect(
    instructions[2].querySelector(".edit-instruction-input").value
  ).toMatch("mix ingredients");

  for (let i = 0; i < 7; ++i) {
    recipeForm.addInstruction("more instructions");
  }

  expect(instructions.length).toEqual(10);
});

test("delete ingredients from the recipe form", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  let ingredients = shadow.getElementById(
    "ingredients-list-container"
  ).children;

  recipeForm.populateRecipeForm(RECIPE_OBJ);

  expect(ingredients.length - 1).toEqual(2);

  recipeForm.addIngredient(4, "bars", "chocolate");
  recipeForm.addIngredient(6, "cloves", "garlic");
  recipeForm.deleteIngredient(
    ingredients[1].querySelector(".recycle-bin-button")
  );

  expect(ingredients.length - 1).toEqual(3);
  expect(
    Number(ingredients[1].querySelector(".edit-ingredient-amount-input").value)
  ).toEqual(4);
  expect(
    ingredients[1].querySelector(".edit-ingredient-unit-input").value
  ).toMatch("bars");
  expect(
    ingredients[1].querySelector(".edit-ingredient-name-input").value
  ).toMatch("chocolate");

  for (let i = ingredients.length - 2; i >= 0; --i) {
    recipeForm.deleteIngredient(
      ingredients[i].querySelector(".recycle-bin-button")
    );
  }

  expect(ingredients.length - 1).toEqual(0);
});

test("delete instructions from the recipe form", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  let instructions = shadow.getElementById("edit-instructions-list").children;

  recipeForm.populateRecipeForm(RECIPE_OBJ);

  expect(instructions.length).toEqual(2);

  recipeForm.addInstruction("mix ingredients");
  recipeForm.addInstruction("clean up");
  recipeForm.deleteInstruction(
    instructions[2].querySelector(".recycle-bin-button")
  );

  expect(instructions.length).toEqual(3);
  expect(
    instructions[2].querySelector(".edit-instruction-input").value
  ).toMatch("clean up");

  for (let i = instructions.length - 1; i >= 0; --i) {
    recipeForm.deleteInstruction(
      instructions[i].querySelector(".recycle-bin-button")
    );
  }

  expect(instructions.length).toEqual(0);
});

test("get edited recipe data", () => {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let shadow = recipeForm.shadowRoot;
  let ingredients = shadow.getElementById(
    "ingredients-list-container"
  ).children;
  let instructions = shadow.getElementById("edit-instructions-list").children;

  recipeForm.populateRecipeForm(RECIPE_OBJ);

  shadow.getElementById("edit-title-input").value = "new title";
  shadow.getElementById("edit-description-input").value = "new description";

  ingredients[0].querySelector(".edit-ingredient-amount-input").value = 2;
  ingredients[0].querySelector(".edit-ingredient-unit-input").value =
    "tablespoons";
  ingredients[0].querySelector(".edit-ingredient-name-input").value = "syrup";
  recipeForm.addIngredient(4, "bars", "chocolate");
  recipeForm.addIngredient(6, "cloves", "garlic");
  recipeForm.deleteIngredient(
    ingredients[1].querySelector(".recycle-bin-button")
  );

  instructions[1].querySelector(".edit-instruction-input").value = "prep";
  recipeForm.addInstruction("mix ingredients");
  recipeForm.addInstruction("clean up");
  recipeForm.deleteInstruction(
    instructions[2].querySelector(".recycle-bin-button")
  );

  let updatedRecipe = recipeForm.getEditedRecipe();

  expect(updatedRecipe.title).toMatch("new title");
  expect(updatedRecipe.description).toMatch("new description");
  expect(updatedRecipe.ingredients.length).toEqual(3);
  expect(updatedRecipe.ingredients[0].amount).toEqual(2);
  expect(updatedRecipe.ingredients[0].unit).toMatch("tablespoons");
  expect(updatedRecipe.ingredients[0].name).toMatch("syrup");
  expect(updatedRecipe.instructions.length).toEqual(3);
  expect(updatedRecipe.instructions[1]).toMatch("prep");
});

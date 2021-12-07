/**
 * @jest-environment jsdom
 */

/* jshint ignore:start */
import { RecipePage } from "../recipe-page.js";
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
      unit: "cup",
      name: "ingredient-1",
    },
  ],
  instructions: ["instruction-1", "instruction-2"],
};

beforeAll(() => {
  "use strict";
  const recipePageTemplate = document.createElement("template");
  recipePageTemplate.id = "recipe-page-template";

  // Keep this template up to date with the corresponding template in
  // source/index.html
  recipePageTemplate.innerHTML = `
      <div id="recipe-container">
        <!-- Recipe Header -->
        <div id="recipe-header-container">
          <div id="recipe-header">
            <h1 id="recipe-title">Recipe Title</h1>
            <p id="recipe-author">Recipe by: Author</p>
          </div>
          <div id="back-button-container">
            <button id="back-button">Back</button>
          </div>
        </div>

        <!-- Recipe Subheader -->
        <div id="recipe-subheader">
          <div id="recipe-tags">
            <p id="recipe-cuisine" class="recipe-tag-info">Cuisine: Italian</p>
            <p id="recipe-ready-in" class="recipe-tag-info">Ready In: x min</p>
          </div>
          <div id="recipe-action">
            <button id="recipe-action-button" type="button">
              <div id="recipe-action-image-outline">
                <div id="recipe-action-image-plus">+</div>
                <img
                  id="recipe-action-image-pencil"
                  class="hide-recipe-part"
                  src="images/pencil_red.png"
                  alt="Red pencil"
                />
              </div>
              <p id="recipe-action-text">Add to Cookbook</p>
            </button>
          </div>
        </div>

        <!-- Recipe Image -->
        <div id="recipe-image-container">
          <img
            id="recipe-image"
            src="images/pasta.jpg"
            alt="Picture of Recipe"
          />
        </div>

        <!-- Recipe Description -->
        <h2 class="recipe-section-header">Description</h2>
        <p id="recipe-description">Description</p>
        <hr class="recipe-horizontal-rule" />

        <!-- Recipe Ingredients -->
        <h2 class="recipe-section-header">Ingredients Checklist</h2>
        <div id="recipe-ingredients-container">
          <section id="recipe-ingredients-section-left">
            <li class="ingredient-item">Lorem</li>
          </section>
          <section id="recipe-ingredients-section-right">
            <li class="ingredient-item">Sit</li>
          </section>
        </div>
        <hr class="recipe-horizontal-rule" />

        <!-- Recipe Instructions -->
        <h2 class="recipe-section-header">Instructions</h2>
        <ol id="instructions-list">
          <li class="instruction-item">Lorem</li>
        </ol>
        <hr class="recipe-horizontal-rule" />
      </div>
    `;
  document.body.append(recipePageTemplate);
});

beforeEach(() => {
  "use strict";
  let recipePage = document.createElement("recipe-page");
  document.body.append(recipePage);
});

afterEach(() => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  recipePage.remove();
});

test("populate recipe page with recipe info from Spoonacular", () => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  recipePage.populateRecipePage(RECIPE_OBJ, true);

  expect(recipePage.recipeId).toEqual(1);
  expect(shadow.getElementById("recipe-title").textContent).toMatch("title");
  expect(shadow.getElementById("recipe-author").textContent).toMatch(
    "Recipe by: author"
  );
  expect(shadow.getElementById("recipe-cuisine").textContent).toMatch(
    "Cuisines: cuisine-0, cuisine-1"
  );
  expect(shadow.getElementById("recipe-ready-in").textContent).toMatch(
    "Ready In: 10 min"
  );
  expect(
    shadow.getElementById("recipe-action-image-plus").classList
  ).not.toContain("hide-recipe-part");
  expect(
    shadow.getElementById("recipe-action-image-pencil").classList
  ).toContain("hide-recipe-part");
  expect(shadow.getElementById("recipe-image").src).toMatch("images/pasta.jpg");
  expect(shadow.getElementById("recipe-description").innerHTML).toMatch(
    "description"
  );
  expect(
    shadow
      .getElementById("recipe-ingredients-section-left")
      .children[0].querySelector("label").textContent
  ).toMatch("1 cup ingredient-0");
  expect(
    shadow
      .getElementById("recipe-ingredients-section-right")
      .children[0].querySelector("label").textContent
  ).toMatch("3 cup ingredient-1");
  expect(
    shadow.getElementById("instructions-list").children[0].textContent
  ).toMatch("instruction-1");
  expect(
    shadow.getElementById("instructions-list").children[1].textContent
  ).toMatch("instruction-2");
});

test("populate recipe page with recipe info from IndexedDB", () => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  recipePage.populateRecipePage(RECIPE_OBJ, false);

  expect(recipePage.recipeId).toBeUndefined();
  expect(shadow.getElementById("recipe-action-image-plus").classList).toContain(
    "hide-recipe-part"
  );
  expect(
    shadow.getElementById("recipe-action-image-pencil").classList
  ).not.toContain("hide-recipe-part");
});

test("scale ingredient amounts by a factor greater than 1", () => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  recipePage.populateRecipePage(RECIPE_OBJ, true);
  recipePage.scaleIngredientAmounts(2);

  expect(
    shadow
      .getElementById("recipe-ingredients-section-left")
      .children[0].querySelector("label").textContent
  ).toMatch("2 cup ingredient-0");
  expect(
    shadow
      .getElementById("recipe-ingredients-section-right")
      .children[0].querySelector("label").textContent
  ).toMatch("6 cup ingredient-1");
});

test("scale ingredient amounts by a factor less than 1", () => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  recipePage.populateRecipePage(RECIPE_OBJ, true);
  recipePage.scaleIngredientAmounts(0.5);

  expect(
    shadow
      .getElementById("recipe-ingredients-section-left")
      .children[0].querySelector("label").textContent
  ).toMatch("0.5 cup ingredient-0");
  expect(
    shadow
      .getElementById("recipe-ingredients-section-right")
      .children[0].querySelector("label").textContent
  ).toMatch("1.5 cup ingredient-1");
});

test("original ingredient amounts are scaled when scaling multiple times", () => {
  "use strict";
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  recipePage.populateRecipePage(RECIPE_OBJ, true);
  recipePage.scaleIngredientAmounts(0.5);
  recipePage.scaleIngredientAmounts(3);

  expect(
    shadow
      .getElementById("recipe-ingredients-section-left")
      .children[0].querySelector("label").textContent
  ).toMatch("3 cup ingredient-0");
  expect(
    shadow
      .getElementById("recipe-ingredients-section-right")
      .children[0].querySelector("label").textContent
  ).toMatch("9 cup ingredient-1");
});

/**
 * @jest-environment jsdom
 */

/* jshint ignore:start */
import { RecipeCard } from "../recipe-card.js";
/* jshint ignore:end */

const RECIPE_OBJ = {
  id: 0,
  title: "title-0",
  image: "images/pasta.jpg",
};

beforeAll(() => {
  "use strict";
  const recipeCardTemplate = document.createElement("template");
  recipeCardTemplate.id = "recipe-card-template";

  // Keep this template up to date with the corresponding template in
  // source/index.html
  recipeCardTemplate.innerHTML = `
      <div id="recipe-card-top-level">
        <div id="recipe-card">
          <img id="recipe-card-image" src="images/pasta.jpg" alt="Card image" />
          <p id="recipe-card-title">Add recipe title here</p>
          <div id="recipe-buttons-container">
            <button id="recipe-info-button" type="button">
              <p id="recipe-info">Learn More</p>
            </button>
            <div id="recipe-card-action">
              <button id="recipe-card-add-button" type="button">
                <div id="recipe-card-add-image-outline">
                  <div id="recipe-card-add-image-content"></div>
                </div>
              </button>
              <button id="recipe-card-delete-button" type="button">
                <input
                  type="image"
                  src="images/trash-can.png"
                  name="remove-image"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  document.body.append(recipeCardTemplate);
});

beforeEach(() => {
  "use strict";
  let recipeCard = document.createElement("recipe-card");
  document.body.append(recipeCard);
});

afterEach(() => {
  "use strict";
  let recipeCard = document.querySelector("recipe-card");
  recipeCard.remove();
});

test("populate recipe card with recipe info from Spoonacular", () => {
  "use strict";
  let recipeCard = document.querySelector("recipe-card");
  let shadow = recipeCard.shadowRoot;
  recipeCard.populateRecipeCard(RECIPE_OBJ, true);

  expect(recipeCard.recipeId).toEqual(0);
  expect(
    shadow.getElementById("recipe-card-add-button").classList
  ).not.toContain("hide-recipe-card-part");
  expect(
    shadow.getElementById("recipe-card-delete-button").classList
  ).toContain("hide-recipe-card-part");
  expect(shadow.getElementById("recipe-info").textContent).toMatch(
    "Learn More"
  );
  expect(shadow.getElementById("recipe-card-title").textContent).toMatch(
    "title-0"
  );
  expect(shadow.getElementById("recipe-card-image").src).toMatch(
    "images/pasta.jpg"
  );
});

test("populate recipe card with recipe info from IndexedDB", () => {
  "use strict";
  let recipeCard = document.querySelector("recipe-card");
  let shadow = recipeCard.shadowRoot;
  recipeCard.populateRecipeCard(RECIPE_OBJ, false);

  expect(recipeCard.recipeId).toBeUndefined();
  expect(shadow.getElementById("recipe-card-add-button").classList).toContain(
    "hide-recipe-card-part"
  );
  expect(
    shadow.getElementById("recipe-card-delete-button").classList
  ).not.toContain("hide-recipe-card-part");
  expect(shadow.getElementById("recipe-info").textContent).toMatch("Open");
});

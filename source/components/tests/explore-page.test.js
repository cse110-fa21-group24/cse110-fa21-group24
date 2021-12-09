/**
 * @jest-environment jsdom
 */

/* jshint ignore:start */
import {
  CHECKBOX,
  RADIO,
  TEXT,
  NUMBER,
  NONE,
  NO_INPUT,
  ExplorePage,
} from "../explore-page.js";
/* jshint ignore:end */

const CUISINE_FILTERS = [
  "cuisine 1",
  "cuisine 2",
  "cuisine 3",
  "cuisine 4",
  "cuisine 5",
];
const DIET_FILTERS = ["None", "diet 1", "diet 2", "diet 3"];
const INTOLERANCE_FILTERS = ["intolerance 1", "intolerance 2"];
const MEAL_TYPE_FILTERS = ["None", "meal type 1", "meal type 2", "meal type 3"];

beforeAll(() => {
  "use strict";
  const explorePageTemplate = document.createElement("template");
  explorePageTemplate.id = "explore-page-template";

  // Keep this template up to date with the corresponding template in
  // source/index.html
  explorePageTemplate.innerHTML = `
      <!-- Main contains filter section with recipe cards -->
      <main id="explore-top-level" class="type-explore">
        <!-- Filter by display -->

        <section id="filter-section">
          <p id="filter-by-text">Filter By:</p>
          <p id="note">[+]: click to expand</p>
          <!-- Each filter category goes here -->
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Cuisine
            </p>
            <form id="filter-cuisines" class="filter-choices-form hidden">
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  id="cuisine-value"
                  name="cuisine-value"
                  value="cuisine value"
                />
                <label for="cuisine-value">cuisine value</label>
              </div>
            </form>
          </div>
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Diet
            </p>
            <form id="filter-diets" class="filter-choices-form hidden">
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  id="diet-value"
                  name="diet-value"
                  value="diet value"
                />
                <label for="diet-value" class="filter-option">diet value</label>
              </div>
            </form>
          </div>
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Interolerances
            </p>
            <form id="filter-intolerances" class="filter-choices-form hidden">
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  id="intolerance-value"
                  name="intolerance-value"
                  value="intolerance value"
                />
                <label for="intolerance-value">intolerance value</label>
              </div>
            </form>
          </div>
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Meal Type
            </p>
            <form id="filter-meal-types" class="filter-choices-form hidden">
              <div class="checkbox-container">
                <input
                  meal
                  type="checkbox"
                  id="meal-type-value"
                  name="meal-type-value"
                  value="meal type value"
                />
                <label for="meal-type-value">meal type value</label>
              </div>
            </form>
          </div>
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Cooking Time
            </p>
            <form class="filter-choices-form hidden">
              <input
                type="number"
                step="15"
                placeholder="60"
                id="cooking-time-input"
                class="filter-input-box"
                name="cooking-time-input"
              />
              <label for="cooking-time-input">minutes</label>
            </form>
          </div>
          <div class="filter-container">
            <p class="filter-choice">
              <button class="filter-button">
                <img class="plus" src="images/plus.png" />
              </button>
              Ingredients
            </p>
            <form class="filter-choices-form hidden">
              <input
                type="text"
                placeholder="corn,rice,etc"
                id="ingredient-input"
                class="filter-input-box"
                name="ingredient-input"
              />
            </form>
          </div>
          <button id="apply-filters" type="button">Apply Filters</button>
          <button id="clear-filters-button" type="button">Clear Filters</button>
        </section>
        <!-- Display with search bar, food options -->
        <section id="display-section">
          <section id="explore-search-section">
            <input id="search-bar" type="text" placeholder="Search Recipes" />
            <!-- Physical Button To Initiate Search-->
            <button id="search-button">Search</button>
          </section>
          <p id="explore-title-text">Explore Recipes</p>
          <p id="no-results-text">No Results Found</p>
          <section id="recipe-cards-section"></section>
          <div id="load-button-container">
            <button id="load-button" type="button">Explore More</button>
          </div>
        </section>
      </main>
    `;
  document.body.append(explorePageTemplate);
});

beforeEach(() => {
  "use strict";
  let explorePage = document.createElement("explore-page");
  document.body.append(explorePage);
});

afterEach(() => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  explorePage.remove();
});

test("expand and collapse all filter sections", () => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let filterButtons = shadow.querySelectorAll(".filter-choice");

  for (let i = 0; i < filterButtons.length; ++i) {
    let image = filterButtons[i].querySelector("img");
    let filterContainer = filterButtons[i].parentElement;

    while (!filterContainer.classList.contains("filter-container")) {
      filterContainer = filterContainer.parentElement;
    }

    let filterChoices = filterContainer.querySelector(".filter-choices-form");

    expect(image.classList).toContain("plus");
    expect(image.classList).not.toContain("minus");
    expect(filterChoices.classList).toContain("hidden");

    explorePage.expandOrCollapseFilter(filterButtons[i]);

    expect(image.classList).not.toContain("plus");
    expect(image.classList).toContain("minus");
    expect(filterChoices.classList).not.toContain("hidden");

    explorePage.expandOrCollapseFilter(filterButtons[i]);

    expect(image.classList).toContain("plus");
    expect(image.classList).not.toContain("minus");
    expect(filterChoices.classList).toContain("hidden");
  }
});

test("create filter options for each filter section that can have options", () => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;

  explorePage.createFilterOptions("filter-cuisines", CUISINE_FILTERS, CHECKBOX);
  explorePage.createFilterOptions("filter-diets", DIET_FILTERS, RADIO);
  explorePage.createFilterOptions(
    "filter-intolerances",
    INTOLERANCE_FILTERS,
    CHECKBOX
  );
  explorePage.createFilterOptions(
    "filter-meal-types",
    MEAL_TYPE_FILTERS,
    RADIO
  );

  let cuisineInputs = shadow
    .getElementById("filter-cuisines")
    .querySelectorAll(`input[type=${CHECKBOX}]`);
  let dietInputs = shadow
    .getElementById("filter-diets")
    .querySelectorAll(`input[type=${RADIO}]`);
  let intoleranceInputs = shadow
    .getElementById("filter-intolerances")
    .querySelectorAll(`input[type=${CHECKBOX}]`);
  let mealTypeInputs = shadow
    .getElementById("filter-meal-types")
    .querySelectorAll(`input[type=${RADIO}]`);

  expect(cuisineInputs.length).toEqual(5);

  for (let i = 0; i < cuisineInputs.length; ++i) {
    expect(cuisineInputs[i].value).toMatch(CUISINE_FILTERS[i]);
  }

  expect(dietInputs.length).toEqual(4);

  for (let i = 0; i < dietInputs.length; ++i) {
    if (dietInputs[i].value === NONE) {
      expect(dietInputs[i].checked).toBeTruthy();
    }

    expect(dietInputs[i].value).toMatch(DIET_FILTERS[i]);
  }

  expect(intoleranceInputs.length).toEqual(2);

  for (let i = 0; i < intoleranceInputs.length; ++i) {
    expect(intoleranceInputs[i].value).toMatch(INTOLERANCE_FILTERS[i]);
  }

  expect(mealTypeInputs.length).toEqual(4);

  for (let i = 0; i < mealTypeInputs.length; ++i) {
    if (mealTypeInputs[i].value === NONE) {
      expect(mealTypeInputs[i].checked).toBeTruthy();
    }

    expect(mealTypeInputs[i].value).toMatch(MEAL_TYPE_FILTERS[i]);
  }
});

test("if present inputs are correctly detected", () => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;

  explorePage.createFilterOptions("filter-cuisines", CUISINE_FILTERS, CHECKBOX);
  explorePage.createFilterOptions("filter-diets", DIET_FILTERS, RADIO);
  explorePage.createFilterOptions(
    "filter-intolerances",
    INTOLERANCE_FILTERS,
    CHECKBOX
  );
  explorePage.createFilterOptions(
    "filter-meal-types",
    MEAL_TYPE_FILTERS,
    RADIO
  );

  let checkboxInputs = shadow.querySelectorAll(`input[type=${CHECKBOX}]`);
  let radioInputs = shadow.querySelectorAll(`input[type=${RADIO}]`);
  let textInputs = shadow.querySelectorAll(`input[type=${TEXT}]`);
  let numberInputs = shadow.querySelectorAll(`input[type=${NUMBER}]`);

  for (let i = 0; i < checkboxInputs.length; ++i) {
    expect(explorePage.inputsPresent()).toBeFalsy();
    checkboxInputs[i].click();
    expect(explorePage.inputsPresent()).toBeTruthy();
    checkboxInputs[i].click();
    expect(explorePage.inputsPresent()).toBeFalsy();
  }

  for (let i = 0; i < radioInputs.length; ++i) {
    let previousPresentState = explorePage.inputsPresent();
    radioInputs[i].click();
    if (radioInputs[i].value === NONE) {
      expect(explorePage.inputsPresent()).toEqual(previousPresentState);
    } else {
      expect(explorePage.inputsPresent()).toBeTruthy();
    }
  }

  for (let i = 0; i < radioInputs.length; ++i) {
    if (radioInputs[i].value === NONE) {
      radioInputs[i].click();
    }
  }

  for (let i = 0; i < textInputs.length; ++i) {
    expect(explorePage.inputsPresent()).toBeFalsy();
    textInputs[i].value = "input";
    expect(explorePage.inputsPresent()).toBeTruthy();
    textInputs[i].value = NO_INPUT;
  }

  for (let i = 0; i < numberInputs.length; ++i) {
    expect(explorePage.inputsPresent()).toBeFalsy();
    numberInputs[i].value = 0;
    expect(explorePage.inputsPresent()).toBeTruthy();
    numberInputs[i].value = NO_INPUT;
  }
});

test("correctly create a query object from the applied filters", () => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;

  explorePage.createFilterOptions("filter-cuisines", CUISINE_FILTERS, CHECKBOX);
  explorePage.createFilterOptions("filter-diets", DIET_FILTERS, RADIO);
  explorePage.createFilterOptions(
    "filter-intolerances",
    INTOLERANCE_FILTERS,
    CHECKBOX
  );
  explorePage.createFilterOptions(
    "filter-meal-types",
    MEAL_TYPE_FILTERS,
    RADIO
  );

  let searchInput = shadow.getElementById("search-bar");
  let cookingTimeInput = shadow.getElementById("cooking-time-input");
  let ingredientInput = shadow.getElementById("ingredient-input");
  let cuisineInputs = shadow
    .getElementById("filter-cuisines")
    .querySelectorAll(`input[type=${CHECKBOX}]`);
  let dietInputs = shadow
    .getElementById("filter-diets")
    .querySelectorAll(`input[type=${RADIO}]`);
  let intoleranceInputs = shadow
    .getElementById("filter-intolerances")
    .querySelectorAll(`input[type=${CHECKBOX}]`);
  let mealTypeInputs = shadow
    .getElementById("filter-meal-types")
    .querySelectorAll(`input[type=${RADIO}]`);

  let queryObj = explorePage.createQueryFromInputs();

  expect(queryObj.query).toBeUndefined();
  expect(queryObj.maxReadyTime).toBeUndefined();
  expect(queryObj.includeIngredients).toBeUndefined();
  expect(queryObj.cuisine).toBeUndefined();
  expect(queryObj.diet).toBeUndefined();
  expect(queryObj.intolerances).toBeUndefined();
  expect(queryObj.type).toBeUndefined();

  searchInput.value = "spaghetti";
  cookingTimeInput.value = 30;
  ingredientInput.value = "marinara sauce,basil";
  cuisineInputs[0].click();
  cuisineInputs[1].click();
  cuisineInputs[2].click();
  dietInputs[3].click();
  intoleranceInputs[0].click();
  intoleranceInputs[1].click();
  mealTypeInputs[2].click();

  queryObj = explorePage.createQueryFromInputs();

  expect(queryObj.query).toMatch("spaghetti");
  expect(Number(queryObj.maxReadyTime)).toEqual(30);
  expect(queryObj.includeIngredients).toMatch("marinara sauce,basil");
  expect(queryObj.cuisine).toMatch("cuisine 1,cuisine 2,cuisine 3");
  expect(queryObj.diet).toMatch("diet 3");
  expect(queryObj.intolerances).toMatch("intolerance 1,intolerance 2");
  expect(queryObj.type).toMatch("meal type 2");
});

test("reset all applied filters back to default state", () => {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;

  explorePage.createFilterOptions("filter-cuisines", CUISINE_FILTERS, CHECKBOX);
  explorePage.createFilterOptions("filter-diets", DIET_FILTERS, RADIO);
  explorePage.createFilterOptions(
    "filter-intolerances",
    INTOLERANCE_FILTERS,
    CHECKBOX
  );
  explorePage.createFilterOptions(
    "filter-meal-types",
    MEAL_TYPE_FILTERS,
    RADIO
  );

  let checkboxInputs = shadow.querySelectorAll(`input[type=${CHECKBOX}]`);
  let radioInputs = shadow.querySelectorAll(`input[type=${RADIO}]`);
  let cookingTimeInput = shadow.getElementById("cooking-time-input");
  let ingredientInput = shadow.getElementById("ingredient-input");

  for (let i = 0; i < checkboxInputs.length; ++i) {
    checkboxInputs[i].click();
  }

  for (let i = 0; i < radioInputs.length; ++i) {
    if (radioInputs[i].value !== NONE) {
      radioInputs[i].click();
    }
  }

  cookingTimeInput.value = 30;
  ingredientInput.value = "watermelon";

  explorePage.clearAllFilters();

  for (let i = 0; i < checkboxInputs.length; ++i) {
    expect(checkboxInputs[i].checked).toBeFalsy();
  }

  for (let i = 0; i < radioInputs.length; ++i) {
    if (radioInputs[i].value === NONE) {
      expect(radioInputs[i].checked).toBeTruthy();
    } else {
      expect(radioInputs[i].checked).toBeFalsy();
    }
  }

  expect(cookingTimeInput.value).toMatch(NO_INPUT);
  expect(ingredientInput.value).toMatch(NO_INPUT);
});

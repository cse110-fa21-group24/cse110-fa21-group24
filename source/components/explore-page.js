const SPACE_REGEX = / /g;
const SECTION = "section-";
export const CHECKBOX = "checkbox";
export const RADIO = "radio";
export const TEXT = "text";
export const NUMBER = "number";
export const NONE = "None";
export const NO_INPUT = "";

/**
 * @classdesc A component for the explore page where users can view
 *            random recipes or recipes they search for.
 *
 */
export class ExplorePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/explore-page.css";

    const explore = document
      .getElementById("explore-page-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(explore);
  }

  set numResults(totalResults) {
    this.internalNumResults = totalResults;
  }

  get numResults() {
    return this.internalNumResults;
  }

  /**
   * Expand or collapse a specific filter section
   * @param {Element} button The button that triggered the expand or collapse
   */
  expandOrCollapseFilter(button) {
    let image = button.querySelector("img");
    let filterContainer = button.parentElement;

    while (!filterContainer.classList.contains("filter-container")) {
      filterContainer = filterContainer.parentElement;
    }

    let filterChoices = filterContainer.querySelector(".filter-choices-form");

    if (image.classList.contains("plus")) {
      image.classList.replace("plus", "minus");
      image.src = "images/minus.png";
      filterChoices.classList.remove("hidden");
    } else {
      image.classList.replace("minus", "plus");
      image.src = "images/plus.png";
      filterChoices.classList.add("hidden");
    }
  }

  /**
   * Add options to a specified filter section
   * @param {string} section The element ID of the filter section to add
   *                         options to
   * @param {array} options An array containing the Spoonacular values of the
   *                        corresponding options to add
   * @param {string} inputType The type of the input element that corresponds
   *                           to each option
   */
  createFilterOptions(section, options, inputType) {
    let filterSection = this.shadowRoot.getElementById(section);
    filterSection.innerHTML = "";

    for (let i = 0; i < options.length; ++i) {
      let optionId = options[i].replace(SPACE_REGEX, "-");

      // Build the option container
      let container = document.createElement("div");
      container.classList.add("checkbox-container");
      filterSection.append(container);

      // Build the option input
      let input = document.createElement("input");
      input.type = inputType;
      input.id = optionId;
      if (inputType === RADIO) {
        if (options[i] === NONE) {
          input.checked = true;
        }
        input.name = SECTION + filterSection;
      } else {
        input.name = optionId;
      }
      input.value = options[i];
      container.append(input);

      // Build the option label
      let label = document.createElement("label");
      label.htmlFor = optionId;
      label.classList.add("filter-option");
      label.textContent = options[i];
      container.append(label);
    }
  }

  /**
   * Determines whether the user has inputted a search query or inputted any
   * filters
   * @returns {boolean} Returns true if there is a search query or any of the
   *                    filters have been applied, otherwise, false is returned
   */
  inputsPresent() {
    let inputsPresent = false;
    let shadow = this.shadowRoot;
    let checkboxInputs = shadow.querySelectorAll(`input[type=${CHECKBOX}]`);
    let radioInputs = shadow.querySelectorAll(`input[type=${RADIO}]`);
    let textInputs = shadow.querySelectorAll(`input[type=${TEXT}]`);
    let numberInputs = shadow.querySelectorAll(`input[type=${NUMBER}]`);

    for (let i = 0; i < checkboxInputs.length; ++i) {
      if (checkboxInputs[i].checked) {
        inputsPresent = true;
      }
    }

    for (let i = 0; i < radioInputs.length; ++i) {
      if (radioInputs[i].checked && radioInputs[i].value !== NONE) {
        inputsPresent = true;
      }
    }

    for (let i = 0; i < textInputs.length; ++i) {
      if (textInputs[i].value) {
        inputsPresent = true;
      }
    }

    for (let i = 0; i < numberInputs.length; ++i) {
      if (numberInputs[i].value) {
        inputsPresent = true;
      }
    }

    return inputsPresent;
  }

  /**
   * Creates an object containing a Spoonacular query from the inputs that the
   * user provided
   * @returns {object} An object containing Spoonacular queries with keys
   *                   representing query parameters and values representing
   *                   query values
   */
  createQueryFromInputs() {
    let shadow = this.shadowRoot;
    let queryObj = {};

    let searchInput = shadow.getElementById("search-bar");
    let cookingTimeInput = shadow.getElementById("cooking-time-input");
    let ingredientInput = shadow.getElementById("ingredient-input");

    // Create search bar query
    if (searchInput.value) {
      queryObj.query = searchInput.value;
    }

    // Create max cooking time query
    if (cookingTimeInput.value) {
      queryObj.maxReadyTime = cookingTimeInput.value;
    }

    // Create ingredients query
    if (ingredientInput.value) {
      queryObj.includeIngredients = ingredientInput.value;
    }

    // Create cuisines query
    let cuisineInputs = shadow
      .getElementById("filter-cuisines")
      .querySelectorAll(`input[type=${CHECKBOX}]`);

    let cuisines = "";
    for (let i = 0; i < cuisineInputs.length; ++i) {
      if (cuisineInputs[i].checked) {
        let cuisine = cuisineInputs[i].value;

        if (!cuisines) {
          cuisines += cuisine;
        } else {
          cuisines += "," + cuisine;
        }
      }
    }

    if (cuisines) {
      queryObj.cuisine = cuisines;
    }

    // Create diet query
    let dietInputs = shadow
      .getElementById("filter-diets")
      .querySelectorAll(`input[type=${RADIO}]`);

    let diet = "";
    for (let i = 0; i < dietInputs.length; ++i) {
      if (dietInputs[i].checked) {
        let selectedDiet = dietInputs[i].value;

        if (selectedDiet !== NONE) {
          diet = selectedDiet;
        }
      }
    }

    if (diet) {
      queryObj.diet = diet;
    }

    // Create intolerances query
    let intoleranceInputs = shadow
      .getElementById("filter-intolerances")
      .querySelectorAll(`input[type=${CHECKBOX}]`);

    let intolerances = "";
    for (let i = 0; i < intoleranceInputs.length; ++i) {
      if (intoleranceInputs[i].checked) {
        let intolerance = intoleranceInputs[i].value;

        if (!intolerances) {
          intolerances += intolerance;
        } else {
          intolerances += "," + intolerance;
        }
      }
    }

    if (intolerances) {
      queryObj.intolerances = intolerances;
    }

    // Create meal type query
    let mealTypeInputs = shadow
      .getElementById("filter-meal-types")
      .querySelectorAll(`input[type=${RADIO}]`);

    let mealType = "";
    for (let i = 0; i < mealTypeInputs.length; ++i) {
      if (mealTypeInputs[i].checked) {
        let selectedMealType = mealTypeInputs[i].value;

        if (selectedMealType !== NONE) {
          mealType = selectedMealType;
        }
      }
    }

    if (mealType) {
      queryObj.type = mealType;
    }

    return queryObj;
  }

  /**
   * Resets all filter options back to their default states
   */
  clearAllFilters() {
    let shadow = this.shadowRoot;
    let checkboxInputs = shadow.querySelectorAll(`input[type=${CHECKBOX}]`);
    let radioInputs = shadow.querySelectorAll(`input[type=${RADIO}]`);
    let cookingTimeInput = shadow.getElementById("cooking-time-input");
    let ingredientInput = shadow.getElementById("ingredient-input");

    for (let i = 0; i < checkboxInputs.length; ++i) {
      checkboxInputs[i].checked = false;
    }

    for (let i = 0; i < radioInputs.length; ++i) {
      if (radioInputs[i].value === NONE) {
        radioInputs[i].checked = true;
      }
    }

    cookingTimeInput.value = NO_INPUT;
    ingredientInput.value = NO_INPUT;
  }
}

customElements.define("explore-page", ExplorePage);

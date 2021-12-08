import { Router } from "./router.js";
import { SpoonacularInterface } from "./spoonacular-interface.js";
import { IndexedDbInterface } from "./indexed-db-interface.js";

const NO_INPUT = "";
const EXPLORE_PAGE_NUM_RESULTS = 6;
const EXPLORE_PAGE_MAX_RESULTS = 18;
const CUISINE_FILTERS = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const DIET_FILTERS = [
  "None",
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-vegetarian",
  "Ovo-vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
];
const INTOLERANCE_FILTERS = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];
const MEAL_TYPE_FILTERS = [
  "None",
  "Appetizer",
  "Beverage",
  "Break",
  "Breakfast",
  "Dessert",
  "Drink",
  "Fingerfood",
  "Main Course",
  "Marinade",
  "Salad",
  "Sauce",
  "Side Dish",
  "Snack",
  "Soup",
];
const HOME_PAGE_NUM_RESULTS = 4;
let COOKBOOK_TO_EDIT = null;
const DEFAULT_COOKBOOK_NAME = "My cookbook";

const router = new Router("home-page", "home-page");
const spoonacular = new SpoonacularInterface();
const indexedDb = new IndexedDbInterface();

/**
 * Attaches "click" event listeners to the back button on the recipe page
 * that return to the previous page when clicked.
 */
function connectRecipeBackButton() {
  "use strict";
  //Get references to buttons in shadowRoot
  let recipePage = document.querySelector("recipe-page");
  let recipeShadow = recipePage.shadowRoot;
  let backButtonRecipe = recipeShadow.getElementById("back-button");

  backButtonRecipe.addEventListener("click", () => {
    let prevPage = router.prevPage;
    router.navigate(prevPage);
  });
}

/**
 * Attaches "click" event listeners to the back button on the singleCookbook
 * page that navigate to the my cookbooks page when clicked.
 */
function connectCookbookBackButton() {
  "use strict";
  //Get references to buttons in shadowRoot
  let singleCookbookPage = document.querySelector("single-cookbook");
  let cookBookShadow = singleCookbookPage.shadowRoot;
  let backButtonCookbook = cookBookShadow.getElementById(
    "cookbook-back-button"
  );

  backButtonCookbook.addEventListener("click", () => {
    router.navigate("cook-book");
  });
}

/**
 * This function toggles whether the explore page will display recipes based on a filter or
 * by random.
 */
function toggleExplorePageType() {
  "use strict";
  let shadow = document.querySelector("explore-page").shadowRoot;
  let topLevel = shadow.getElementById("explore-top-level");
  let loadButton = shadow.getElementById("load-button");
  topLevel.classList.toggle("type-explore");

  if (topLevel.classList.contains("type-explore")) {
    loadButton.textContent = "Explore More";
  } else {
    loadButton.textContent = "Load More";
  }
}

/**
 * Populates new recipes in the Explore page by retrieving new recipes from
 * Spoonacular
 * @function populateExplorePage
 */
async function populateExplorePage(filtersObj) {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let topLevel = shadow.getElementById("explore-top-level");
  let recipeCards = shadow.getElementById("recipe-cards-section").children;

  for (let i = 0; i < EXPLORE_PAGE_MAX_RESULTS; ++i) {
    recipeCards[i].classList.add("make-invisible");

    if (i >= EXPLORE_PAGE_NUM_RESULTS) {
      recipeCards[i].classList.add("hidden");
    }
  }

  let recipes = [];
  if (topLevel.classList.contains("type-explore")) {
    recipes = await spoonacular.getRandomRecipes(EXPLORE_PAGE_NUM_RESULTS);
  } else {
    recipes = await spoonacular.getRecipes(filtersObj);
  }
  explorePage.numResults = recipes.length;

  // When no results are returned
  if (explorePage.numResults === 0) {
    shadow.getElementById("no-results-text").classList.remove("hidden");

    for (let i = 0; i < EXPLORE_PAGE_MAX_RESULTS; ++i) {
      recipeCards[i].classList.add("make-invisible");

      if (i >= EXPLORE_PAGE_NUM_RESULTS) {
        recipeCards[i].classList.add("hidden");
      }
    }
  }
  // Display up to EXPLORE_PAGE_NUM_RESULTS recipe cards
  else {
    shadow.getElementById("no-results-text").classList.add("hidden");

    if (explorePage.numResults > EXPLORE_PAGE_MAX_RESULTS) {
      explorePage.numResults = EXPLORE_PAGE_MAX_RESULTS;
    }

    //load initial recipes
    for (let i = 0; i < EXPLORE_PAGE_MAX_RESULTS; ++i) {
      if (i < EXPLORE_PAGE_NUM_RESULTS && i < explorePage.numResults) {
        recipeCards[i].populateRecipeCard(recipes[i], true);
        recipeCards[i].classList.remove("make-invisible");
        recipeCards[i].classList.remove("hidden");
      } else if (i >= EXPLORE_PAGE_NUM_RESULTS && i < explorePage.numResults) {
        recipeCards[i].classList.add("hidden");
        recipeCards[i].populateRecipeCard(recipes[i], true);
      } else if (i < EXPLORE_PAGE_NUM_RESULTS && i >= explorePage.numResults) {
        recipeCards[i].classList.add("make-invisible");
      } else {
        break;
      }
    }
  }
}

/**
 * Loads rest of recipes on explore page
 * @function loadExplorePage
 */
async function loadExplorePage() {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let recipeCards = shadow.getElementById("recipe-cards-section").children;

  //load all recipes
  for (let i = 0; i < explorePage.numResults; ++i) {
    if (
      recipeCards[i].classList.contains("make-invisible") ||
      recipeCards[i].classList.contains("hidden")
    ) {
      recipeCards[i].classList.remove("make-invisible");
      recipeCards[i].classList.remove("hidden");
    }
  }
}

/**
 * Creates a cookbook element and adds it to the document
 * @function createCookbook
 */
function createCookbook() {
  "use strict";
  const cookbook = document.createElement("cook-book");
  cookbook.classList.toggle("hidden");
  document.querySelector("body").append(cookbook);
}

/**
 * Binds the Create Cookbook button in the Create Cookbook form to save
 * cookbooks to local storage
 * @function bindCreateCookbookSave
 */
function bindCreateCookbookSave() {
  "use strict";
  let shadow = document.querySelector("create-cookbook").shadowRoot;
  let saveButton = shadow.getElementById("save-button");
  let cancelButton = shadow.getElementById("cancel-button-container");

  saveButton.addEventListener("click", async () => {
    let title = shadow.getElementById("title-input").value;

    if (title !== NO_INPUT) {
      let description = shadow.getElementById("description-input").value;
      await indexedDb.createCookbook(title, description);
      populateSelectCookbookOptions();
      await populateCookbooksPage();

      // Reset the page to original values
      shadow.getElementById("title-input").value = NO_INPUT;
      shadow.getElementById("description-input").value = NO_INPUT;

      router.navigate("cook-book");
    }
  });

  cancelButton.addEventListener("click", () => {
    shadow.getElementById("title-input").value = NO_INPUT;
    shadow.getElementById("description-input").value = NO_INPUT;

    router.navigate("cook-book");
  });
}

/**
 * Creates a form for creating a new cookbook and adds it to the document
 * @function createCreateCookbook
 */
function createCreateCookbook() {
  "use strict";
  const createCookbook = document.createElement("create-cookbook");
  createCookbook.classList.toggle("hidden");
  document.querySelector("body").append(createCookbook);
}

/**
 * Creates a form for editing a cookbook and adds it to the document
 * @function createEditCookbook
 */
function createEditCookbook() {
  "use strict";
  const editCookbook = document.createElement("edit-cookbook");
  editCookbook.classList.toggle("hidden");
  document.querySelector("body").append(editCookbook);
}

/**
 * Creates the explore page and adds it to the document
 * @function createExplorePage
 */
function createExplorePage() {
  "use strict";
  const explorePage = document.createElement("explore-page");
  explorePage.classList.toggle("hidden");
  const recipeCardsSection = explorePage.shadowRoot.getElementById(
    "recipe-cards-section"
  );

  for (let i = 0; i < EXPLORE_PAGE_MAX_RESULTS; ++i) {
    const recipeCard = document.createElement("recipe-card");
    recipeCard.classList.add("make-invisible");
    recipeCard.classList.add("hidden");
    recipeCardsSection.append(recipeCard);
  }

  document.querySelector("body").append(explorePage);

  explorePage.addCuisineFilters(CUISINE_FILTERS);
  explorePage.addDietFilters(DIET_FILTERS);
  explorePage.addIntoleranceFilters(INTOLERANCE_FILTERS);
  explorePage.addMealTypeFilters(MEAL_TYPE_FILTERS);
}

/**
 * @function bindExploreSearchButton
 * @description This function binds the search bar in the explore page so that
 *              you can enter queries and get results based on the user input.
 */
function bindExploreSearchButton() {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let searchButton = shadow.getElementById("search-button");

  let searchBar = shadow.getElementById("search-bar");
  let applyFilters = shadow.getElementById("apply-filters");
  let cookingTimeInput = shadow.getElementById("cooking-time-input");
  let ingredientInput = shadow.getElementById("ingredient-input");

  // The search bar, cooking time input, ingredient input, and Apply Filters
  // button all trigger queries through the Search button
  searchBar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  cookingTimeInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  ingredientInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  applyFilters.addEventListener("click", () => {
    searchButton.click();
  });

  searchButton.addEventListener("click", async () => {
    // If there are queries present
    if (explorePage.inputsPresent()) {
      if (
        //Toggle off explore type
        shadow
          .getElementById("explore-top-level")
          .classList.contains("type-explore")
      ) {
        toggleExplorePageType();
      }

      //Create query object for parameter to API call
      let queryObj = explorePage.createQueryFromInputs();
      queryObj.number = EXPLORE_PAGE_MAX_RESULTS;

      // Call Spoonacular API with queries
      await populateExplorePage(queryObj);
    } else {
      //Otherwise, if there are no queries,
      if (
        //Toggle the explore type
        !shadow
          .getElementById("explore-top-level")
          .classList.contains("type-explore")
      ) {
        toggleExplorePageType();
      }

      //Call Spoonacular API with random recipes
      await populateExplorePage();
    }
  });
}

/**
 * Creates a wave custom element and adds it to the document
 * @function createFooterImg
 */
function createFooterImg() {
  "use strict";
  const footerImg = document.createElement("footer-img");
  document.querySelector("body").append(footerImg);
}

/**
 * Creates a home page element and adds it to the document
 * @function createHomePage
 */
function createHomePage() {
  "use strict";
  const homePage = document.createElement("home-page");
  document.querySelector("body").append(homePage);
}

/**
 * Creates a navbar custom element and adds it to the document
 * @function
 */
function createNavbar() {
  "use strict";
  const navbar = document.createElement("custom-navbar");
  document.querySelector("body").append(navbar);
}

/**
 * Creates the recipe added notification and adds it to the document
 * @function createNotificationRecipeAdded
 */
function createNotificationRecipeAdded() {
  "use strict";
  const notification = document.createElement("notification-recipe-added");
  notification.classList.toggle("hidden");
  document.querySelector("body").append(notification);
}

/**
 * Creates the recipe deleted notification and adds it to the document
 * @function createNotificationRecipeDeleted
 */
function createNotificationRecipeDeleted() {
  "use strict";
  const notification = document.createElement("notification-recipe-deleted");
  notification.classList.toggle("hidden");
  document.querySelector("body").append(notification);
}

/**
 * Creates the select cookbook notification and adds it to the document
 * @function createNotificationSelectCookbook
 */
function createNotificationSelectCookbook() {
  "use strict";
  const notification = document.createElement("notification-select-cookbook");
  notification.classList.toggle("hidden");
  document.querySelector("body").append(notification);
}

/**
 * Creates the form for editing a recipe and adds it to the document
 * @function createRecipeForm
 */
function createRecipeForm() {
  "use strict";
  const recipeForm = document.createElement("recipe-form");
  recipeForm.classList.toggle("hidden");
  document.querySelector("body").append(recipeForm);
}

/**
 * Creates the recipe page and adds it to the document
 * @function createRecipePage
 */
function createRecipePage() {
  "use strict";
  const recipePage = document.createElement("recipe-page");
  recipePage.classList.toggle("hidden");
  document.querySelector("body").append(recipePage);
}

/**
 * Creates the single cookbook page and adds it to the document
 * @function createSingleCookbook
 */
function createSingleCookbook() {
  "use strict";
  const singleCookbook = document.createElement("single-cookbook");
  singleCookbook.classList.toggle("hidden");
  document.querySelector("body").append(singleCookbook);
}

/**
 * Attaches "click" event listeners to the buttons on the navbar
 * that navigate to the correct page when clicked.
 */
function connectNavbarButtons() {
  "use strict";

  //Get references to buttons in shadowRoot
  let navbar = document.querySelector("custom-navbar");
  let shadow = navbar.shadowRoot;
  let buttons = shadow.querySelectorAll("button.navbar-tab");

  //Loop through buttons and establish click listeners on each button
  for (let i = 0; i < buttons.length; i++) {
    //Use if statements to check for name for easy style changes in the future
    if (buttons[i].textContent === "Home") {
      buttons[i].addEventListener("click", () => {
        router.navigate("home-page");
      });
    }

    if (buttons[i].textContent === "Explore") {
      buttons[i].addEventListener("click", () => {
        router.navigate("explore-page"); // Navigate to explore page
      });
    }

    if (buttons[i].textContent === "My Cookbooks") {
      buttons[i].addEventListener("click", () => {
        router.navigate("cook-book");
      });
    }
  }
}

/**
 * Allows new recipes to be populated in the Explore when pressing the Explore
 * More or Explore Recipes buttons in the Explore page
 * @function bindExploreLoadButton
 */
function bindExploreLoadButton() {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let topLevel = shadow.getElementById("explore-top-level");
  let loadButton = shadow.getElementById("load-button");

  loadButton.addEventListener("click", async () => {
    if (
      topLevel.classList.contains("type-explore") &&
      !explorePage.inputsPresent()
    ) {
      await populateExplorePage();
    } else {
      if (!explorePage.inputsPresent()) {
        toggleExplorePageType();
        await populateExplorePage();
      } else {
        if (topLevel.classList.contains("type-explore")) {
          toggleExplorePageType();
        }

        await loadExplorePage();
      }
    }
  });
}

/**
 * @function bindCollapsibleFilters
 *
 * Bind the buttons to collapse and expand the filters for the filters on the explore page.
 */
function bindCollapsibleFilters() {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let shadow = explorePage.shadowRoot;
  let filterButtons = shadow.querySelectorAll(".filter-choice");

  let makeCollapsible = (event) => {
    explorePage.expandOrCollapseFilter(event.currentTarget);
  };

  for (let i = 0; i < filterButtons.length; ++i) {
    filterButtons[i].addEventListener("click", makeCollapsible);
  }
}

/**
 * @function bindClearFiltersButton
 * @description Allows the Clear Filters button to reset all filters back to
 *              their default state
 */
function bindClearFiltersButton() {
  "use strict";
  let explorePage = document.querySelector("explore-page");
  let clearFiltersButton = explorePage.shadowRoot.getElementById(
    "clear-filters-button"
  );

  clearFiltersButton.addEventListener("click", () => {
    explorePage.clearAllFilters();
  });
}

/**
 * Navigate to explore page if "Explore" button is clicked
 *
 * @function homeExploreButton
 */
function homeExploreButton() {
  "use strict";

  //Get references to explore button on homepge
  let home = document.querySelector("home-page");
  let shadow = home.shadowRoot;
  let explore = shadow.querySelector("button.explore-button");

  explore.addEventListener("click", () => {
    router.navigate("explore-page");
  });
}

/**
 * Navigate to explore page if "Explore" button is clicked
 *
 */
function homeSearchFunction() {
  "use strict";

  //Get references to search bar on homepage
  let home = document.querySelector("home-page");
  let shadow = home.shadowRoot;
  let input = shadow.getElementById("recipe-search");

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // store search string and navigate to explore page
      let searchQuery = { query: e.target.value };

      //clear search and route to explore
      e.target.value = NO_INPUT;
      router.navigate("explore-page");

      //display results of search
      let explore = document.querySelector("explore-page");
      let shadow = explore.shadowRoot;
      let topLevel = shadow.getElementById("explore-top-level");
      let bar = shadow.getElementById("search-bar");
      bar.value = searchQuery.query;
      if (searchQuery.query.length) {
        if (topLevel.classList.contains("type-explore")) {
          toggleExplorePageType();
        }

        searchQuery.number = EXPLORE_PAGE_MAX_RESULTS;
        populateExplorePage(searchQuery);
      } else {
        if (!topLevel.classList.contains("type-explore")) {
          toggleExplorePageType();
        }
        populateExplorePage();
      }
    }
  });
}

/**
 * Attaches "click" event listeners to the Create New Cookbook
 * button on My Cookbook page which will navigate to Create Cookbook page.
 */
function connectCreateNewCookbook() {
  "use strict";

  //Get references to createButtons
  let templatePage = document.querySelector("cook-book");
  let shadow = templatePage.shadowRoot;
  let button = shadow.querySelector("button");

  button.addEventListener("click", () => {
    router.navigate("create-cookbook");
  });
}

/**
 * Populate the my cookbooks page with cookbook cards
 * @function populateCookbooksPage
 */
async function populateCookbooksPage() {
  "use strict";

  // get reference to cookbook page and the card section
  let shadow = document.querySelector("cook-book").shadowRoot;
  let cardContainer = shadow.getElementById("cards");

  // clear any existing cards
  cardContainer.innerHTML = "";

  // get cookbooks from db
  let cookbooks = await indexedDb.getAllCookbooks();

  // add each cookbook to the page as a new card
  for (let i = 0; i < cookbooks.length; i++) {
    let card = document.createElement("cookbook-card");
    card.cookbook = cookbooks[i];

    let shadow = card.shadowRoot;
    let title = shadow.querySelector(".title").textContent;

    if (title === DEFAULT_COOKBOOK_NAME) {
      let removebutton = shadow.getElementById("remove");
      let editbutton = shadow.getElementById("edit");
      removebutton.classList.add("make-invisible");
      editbutton.classList.add("make-invisible");
    }

    bindCookbookCardButtons(card);

    if (title === DEFAULT_COOKBOOK_NAME) {
      cardContainer.prepend(card);
    } else {
      cardContainer.appendChild(card);
    }
  }
}

/**
 * Helper Method for bindCookbookCardButtons
 * @function fillEditCookbook
 * @param {string} title of cookbook
 * @param {string} description of cookbook
 */
function fillEditCookbook(title, description) {
  "use strict";

  // References to edit cookbook
  let edit = document.querySelector("edit-cookbook");
  let shadow = edit.shadowRoot;
  let titleInput = shadow.getElementById("cb-title");
  let descriptionInput = shadow.getElementById("cb-description");

  titleInput.value = title;
  descriptionInput.value = description;
}

/**
 * Attaches event listeners to the buttons within a given cookbook card
 * @function bindCookbookCardButtons
 * @param {object} card The cookbook card element
 */
function bindCookbookCardButtons(card) {
  "use strict";

  // get references to the buttons in the card
  let shadow = card.shadowRoot;
  let title = shadow.querySelector(".title").textContent;
  let editButton = shadow.getElementById("edit");
  let removeButton = shadow.getElementById("remove");
  let openButton = shadow.getElementById("open");

  editButton.addEventListener("click", () => {
    // Updates the COOKBOOK_TO_EDIT
    COOKBOOK_TO_EDIT = title;
    router.navigate("edit-cookbook");

    // prefill edit form
    fillEditCookbook(card.cookbook.title, card.cookbook.description);
  });

  removeButton.addEventListener("click", (event) => {
    let cookbookCard = event.currentTarget.getRootNode().host;
    indexedDb.deleteCookbook(card.cookbook.title);
    populateSelectCookbookOptions();
    cookbookCard.remove();
  });

  openButton.addEventListener("click", async () => {
    await populateSingleCookbook(card.cookbook);
    router.navigate("single-cookbook");
  });
}

/**
 * Populates the single cookbook view with the recipe cards of the
 * given cookbook.
 * @function populateSingleCookbook
 * @param {object} cookbook The cookbook object from indexedDb
 */
async function populateSingleCookbook(cookbook) {
  "use strict";

  // get reference to single cookbook page & elements
  let shadow = document.querySelector("single-cookbook").shadowRoot;
  let title = shadow.querySelector(".title");
  let cardContainer = shadow.querySelector(".recipe-container");

  title.textContent = cookbook.title;

  // clear all cards that were previously added
  cardContainer.innerHTML = "";

  let recipes = await indexedDb.getAllRecipes(cookbook.title);
  for (const key in recipes) {
    if (recipes.hasOwnProperty(key)) {
      // set up card
      const recipe = recipes[key];
      let card = document.createElement("recipe-card");
      card.recipe = recipe;
      card.recipeKey = key;
      card.cookbookTitle = cookbook.title;
      card.populateRecipeCard(recipe, false);
      bindCookbookRecipeCardButtons(card);

      cardContainer.appendChild(card);
    }
  }
}

/**
 * Attaches event listeners to the buttons within a recipe card in the single cookbook view
 * @function bindCookbookRecipeCardButtons
 * @param {object} card The recipe card element
 */
function bindCookbookRecipeCardButtons(card) {
  "use strict";

  // get button references
  let shadow = card.shadowRoot;
  let openButton = shadow.getElementById("recipe-info-button");
  let deleteButton = shadow.getElementById("recipe-card-delete-button");

  openButton.addEventListener("click", () => {
    let recipePage = document.querySelector("recipe-page");
    recipePage.recipeKey = card.recipeKey;
    recipePage.cookbookTitle = card.cookbookTitle;
    recipePage.populateRecipePage(card.recipe, false);
    router.navigate("recipe-page");
  });

  deleteButton.addEventListener("click", () => {
    indexedDb.deleteRecipe(card.cookbookTitle, card.recipeKey);
    card.remove();
  });
}

/**
 * Populates the Select Cookbook notification options with all of the user's
 * cookbooks
 * @function populateSelectCookbookOptions
 */
async function populateSelectCookbookOptions() {
  "use strict";
  let notificationSelectCookbook = document.querySelector(
    "notification-select-cookbook"
  );
  let shadow = notificationSelectCookbook.shadowRoot;
  let cookbookDropdown = shadow.getElementById("cookbooks");

  while (cookbookDropdown.children[1]) {
    cookbookDropdown.removeChild(cookbookDropdown.lastChild);
  }

  let cookbooks = await indexedDb.getAllCookbooks();

  for (let i = 0; i < cookbooks.length; ++i) {
    if (cookbooks[i].title !== DEFAULT_COOKBOOK_NAME) {
      let option = document.createElement("option");
      option.value = cookbooks[i].title;
      option.textContent = cookbooks[i].title;
      cookbookDropdown.append(option);
    }
  }
}

/**
 * In the Select Cookbooks popup, this function binds the X button to close
 * the popup and binds the Add button to save the currently opened recipe to
 * the selected cookbook
 * @function bindSelectCookbookButtons
 */
function bindSelectCookbookButtons() {
  "use strict";
  let notificationSelectCookbook = document.querySelector(
    "notification-select-cookbook"
  );
  let shadow = notificationSelectCookbook.shadowRoot;

  let addButton = shadow.getElementById("add-button");
  let addedRecipe = null;

  addButton.addEventListener("click", async () => {
    let recipePage = document.querySelector("recipe-page");
    let selectedCookbook = shadow.getElementById("cookbooks").value;

    if (!recipePage.classList.contains("hidden")) {
      let recipeId = recipePage.recipeId;
      addedRecipe = await spoonacular.getRecipeInfo(recipeId);
      await indexedDb.addRecipe(selectedCookbook, addedRecipe);
    } else {
      addedRecipe = await spoonacular.getRecipeInfo(
        notificationSelectCookbook.recipe
      );
      await indexedDb.addRecipe(selectedCookbook, addedRecipe);
    }
    //If the selected cookbook wasn't the default,
    if (selectedCookbook !== DEFAULT_COOKBOOK_NAME) {
      //Add the recipe to the default cookbook also
      await indexedDb.addRecipe(DEFAULT_COOKBOOK_NAME, addedRecipe);
    }
    notificationSelectCookbook.classList.add("hidden");
  });

  let closeButton = shadow.getElementById("close");

  closeButton.addEventListener("click", () => {
    notificationSelectCookbook.classList.toggle("hidden");
  });
}

/**
 * Populates new recipes in the home page by retrieving new recipes from
 * Spoonacular
 * @function populateHomePage
 */
async function populateHomePage() {
  "use strict";
  let shadow = document.querySelector("home-page").shadowRoot;
  const explore = shadow.getElementById("explore");

  for (let i = 0; i < HOME_PAGE_NUM_RESULTS; ++i) {
    const recipeCard = document.createElement("recipe-card");
    explore.append(recipeCard);
  }

  let recipes = await spoonacular.getRandomRecipes(HOME_PAGE_NUM_RESULTS);
  let recipeCards = explore.children;

  for (let i = 0; i < recipeCards.length; ++i) {
    recipeCards[i].populateRecipeCard(recipes[i], true);
  }
}

/**
 * Bind event listeners to the buttons of recipe cards on the Home and Explore
 * pages
 * @function bindHomeExploreRecipeCards
 */
function bindHomeExploreRecipeCards() {
  "use strict";

  let redirectToRecipe = async (event) => {
    let recipeCardShadow = event.currentTarget.getRootNode();
    let recipeCard = recipeCardShadow.host;
    let recipeId = recipeCard.recipeId;
    let recipeObj = await spoonacular.getRecipeInfo(recipeId);
    let recipePage = document.querySelector("recipe-page");
    recipePage.populateRecipePage(recipeObj, true);
    router.navigate("recipe-page");
  };

  let openCookbookSelection = (event) => {
    let recipeCardShadow = event.currentTarget.getRootNode();
    let recipeCard = recipeCardShadow.host;
    let recipeId = recipeCard.recipeId;
    let notificationSelectCookbook = document.querySelector(
      "notification-select-cookbook"
    );
    notificationSelectCookbook.recipe = recipeId;
    notificationSelectCookbook.classList.toggle("hidden");
  };

  let shadow = document.querySelector("home-page").shadowRoot;
  let recipeCards = shadow.getElementById("explore").children;

  for (let i = 0; i < recipeCards.length; ++i) {
    let cardShadow = recipeCards[i].shadowRoot;
    let button = cardShadow.getElementById("recipe-info-button");
    button.addEventListener("click", redirectToRecipe);

    let addButton = cardShadow.getElementById("recipe-card-add-button");
    addButton.addEventListener("click", openCookbookSelection);
  }

  shadow = document.querySelector("explore-page").shadowRoot;
  recipeCards = shadow.getElementById("recipe-cards-section").children;

  for (let i = 0; i < recipeCards.length; ++i) {
    let cardShadow = recipeCards[i].shadowRoot;
    let button = cardShadow.getElementById("recipe-info-button");
    button.addEventListener("click", redirectToRecipe);

    let addButton = cardShadow.getElementById("recipe-card-add-button");
    addButton.addEventListener("click", openCookbookSelection);
  }
}

/**
 * Attaches "click" event listener to the Edit Recipe/Add to Cookbook
 * button on the recipe page, which will either open the recipe edit form,
 * or the cookbook select pop up
 * @function connectRecipeAction
 */
function connectRecipeAction() {
  "use strict";

  // get references to button and text
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  let button = shadow.getElementById("recipe-action-button");
  let text = shadow.getElementById("recipe-action-text");

  button.addEventListener("click", () => {
    // get text string
    let string = text.textContent;

    // open edit page or cookbook selector, respectively
    if (string === "Edit Recipe") {
      let recipeForm = document.querySelector("recipe-form");
      recipeForm.recipeKey = recipePage.recipeKey;
      recipeForm.cookbookTitle = recipePage.cookbookTitle;
      recipeForm.populateRecipeForm(recipePage.recipe);

      // We do not use router.navigate() here because doing so would cause the
      // Back button on the recipe page to redirect to the edit recipe page if
      // the edit recipe page was previously opened
      recipePage.classList.add("hidden");
      recipeForm.classList.remove("hidden");
      document.querySelector("html").scrollTop = 0;
    } else {
      let notification = document.querySelector("notification-select-cookbook");
      notification.classList.toggle("hidden");
    }
  });
}

/**
 * Adds an event listener to the "Save Changes" button in the "Edit Cookbook"
 * page.
 * @function buttonsEditCookbook
 */
function buttonsEditCookbook() {
  // Get the "Save Changes" button
  "use strict";
  let templatePage = document.querySelector("edit-cookbook");
  let shadow = templatePage.shadowRoot;
  let saveButton = shadow.getElementById("save-edits-button");

  let cancelButton = shadow.getElementById("cancel-button-container2");

  saveButton.addEventListener("click", async () => {
    // Get the Title and the Description
    let templatePage = document.querySelector("edit-cookbook");
    let shadow = templatePage.shadowRoot;
    let mainDiv = shadow.querySelector("div.input-container");

    // Gets the div by index (first div = 0, second div = 1)
    let title = mainDiv.children[0].getElementsByTagName("input")[0].value;
    let description =
      mainDiv.children[1].getElementsByTagName("input")[0].value;

    // Nothing to update
    if (title === NO_INPUT && description === NO_INPUT) {
      router.navigate("cook-book");
    }
    // Only update description
    else if (title === NO_INPUT && description !== NO_INPUT) {
      // Place into storage
      await indexedDb.editCookbook(
        COOKBOOK_TO_EDIT,
        COOKBOOK_TO_EDIT,
        description
      );

      // Update the cookbooks
      await populateCookbooksPage();

      // Set the textbox fields to original format
      mainDiv.children[0].getElementsByTagName("input")[0].value = NO_INPUT;
      mainDiv.children[1].getElementsByTagName("input")[0].value = NO_INPUT;

      // Go back to cookbook page
      router.navigate("cook-book");
    } else {
      await indexedDb.editCookbook(COOKBOOK_TO_EDIT, title, description);

      populateSelectCookbookOptions();
      await populateCookbooksPage();

      mainDiv.children[0].getElementsByTagName("input")[0].value = NO_INPUT;
      mainDiv.children[1].getElementsByTagName("input")[0].value = NO_INPUT;

      router.navigate("cook-book");
    }
  });

  cancelButton.addEventListener("click", () => {
    let mainDiv = shadow.querySelector("div.input-container");
    mainDiv.children[0].getElementsByTagName("input")[0].value = NO_INPUT;
    mainDiv.children[1].getElementsByTagName("input")[0].value = NO_INPUT;

    router.navigate("cook-book");
  });
}

/**
 * When the user clicks Add New Recipe when viewing a cookbook, the user
 * should be redirected to the Explore page.
 * @function addRecipe
 */
function addRecipe() {
  "use strict";

  // get references to button
  let cookbook = document.querySelector("single-cookbook");
  let shadow = cookbook.shadowRoot;
  let button = shadow.getElementById("add-recipe");

  //navigate to explore page
  button.addEventListener("click", () => {
    router.navigate("explore-page");
  });
}

async function initializeDefaultCookbook() {
  "use strict";

  try {
    await indexedDb.createCookbook(
      DEFAULT_COOKBOOK_NAME,
      "Your default cookbook!"
    );
    await populateCookbooksPage().then(() => {});
  } catch (err) {
    console.log(
      "Default attempted to be created again. Probably just a page reload."
    );
  }
}

/**
 * Adds functionality to the Add Ingredients, Add Instructions, recycle bins,
 * Save Changes, and Cancel buttons on the recipe edit page
 * @function bindRecipeFormButtons
 */
async function bindRecipeFormButtons() {
  "use strict";
  let recipeForm = document.querySelector("recipe-form");
  let recipePage = document.querySelector("recipe-page");
  let shadow = recipeForm.shadowRoot;

  // Bind Add Ingredient to create a new ingredient field
  let addIngredient = shadow.getElementById("add-ingredient-button");
  addIngredient.addEventListener("click", () => {
    recipeForm.addIngredient(NO_INPUT, NO_INPUT, NO_INPUT);
  });

  // Bind Add Instruction to create a new instruction field
  let addInstruction = shadow.getElementById("add-instruction-button");
  addInstruction.addEventListener("click", () => {
    recipeForm.addInstruction(NO_INPUT);
  });

  // Bind recycle bin buttons to delete a specific ingredient or instruction
  shadow.addEventListener("click", (event) => {
    if (event.target.classList.contains("ingredient-recycle-bin")) {
      recipeForm.deleteIngredient(event.target);
    } else if (event.target.classList.contains("instruction-recycle-bin")) {
      recipeForm.deleteInstruction(event.target);
    }
  });

  // Bind Save Changes button to update the recipe with the new changes
  let saveChanges = shadow.getElementById("recipe-form-save-button");
  saveChanges.addEventListener("click", () => {
    let recipeObj = recipeForm.getEditedRecipe();
    recipePage.populateRecipePage(recipeObj, false);
    indexedDb.editRecipe(
      recipeForm.cookbookTitle,
      recipeForm.recipeKey,
      recipeObj
    );
    populateSingleCookbook({ title: recipeForm.cookbookTitle });

    // We do not use router.navigate() here because doing so would cause the
    // Back button on the recipe page to redirect to the edit recipe page if
    // the edit recipe page was previously opened
    recipeForm.classList.add("hidden");
    recipePage.classList.remove("hidden");
    document.querySelector("html").scrollTop = 0;
  });

  // Bind Cancel button to go back to the recipe page
  let cancel = shadow.getElementById("recipe-form-cancel-button");
  cancel.addEventListener("click", () => {
    // We do not use router.navigate() here because doing so would cause the
    // Back button on the recipe page to redirect to the edit recipe page if
    // the edit recipe page was previously opened
    recipeForm.classList.add("hidden");
    recipePage.classList.remove("hidden");
    document.querySelector("html").scrollTop = 0;
  });
}

/**
 * Binds the scaling buttons on the recipe page by the ingredients. Allows users
 * to scale the serving size for their recipes.
 *
 * @function bindScaling
 */
function bindScaling() {
  "use strict";

  let recipePage = document.querySelector("recipe-page");
  let shadow = recipePage.shadowRoot;
  let downButton = shadow.getElementById("decrease-scale");
  let upButton = shadow.getElementById("increase-scale");
  let scaleValue = shadow.getElementById("scale-value");

  upButton.addEventListener("click", () => {
    let increment = 1;
    let numScale = Number(scaleValue.textContent);

    if (numScale === 0.25) {
      increment = 0.25;
    } else if (numScale === 0.5) {
      increment = 0.5;
    } else if (numScale < 10) {
      increment = 1;
    } else {
      increment = 0;
    }
    scaleValue.textContent = numScale + increment;
    recipePage.scaleIngredientAmounts(numScale + increment);
  });

  downButton.addEventListener("click", () => {
    let decrement = 1;
    let numScale = Number(scaleValue.textContent);

    if (numScale > 1) {
      decrement = 1;
    } else if (numScale === 1) {
      decrement = 0.5;
    } else if (numScale === 0.5) {
      decrement = 0.25;
    } else {
      decrement = 0;
    }

    scaleValue.textContent = numScale - decrement;
    recipePage.scaleIngredientAmounts(numScale - decrement);
  });
}

/**
 * Runs initial setup functions when the page first loads
 * @function init
 */
async function init() {
  "use strict";

  await indexedDb.openDb();

  createNavbar();
  createHomePage();
  createExplorePage();
  populateExplorePage();
  bindExploreLoadButton();
  populateHomePage();
  bindHomeExploreRecipeCards();

  createCookbook();
  createFooterImg();

  createCreateCookbook();
  createEditCookbook();
  createNotificationRecipeAdded();
  createNotificationRecipeDeleted();
  createNotificationSelectCookbook();
  createRecipeForm();
  createRecipePage();
  createSingleCookbook();
  bindCreateCookbookSave();
  addRecipe();

  connectNavbarButtons();

  homeSearchFunction();
  homeExploreButton();
  connectCreateNewCookbook();
  bindExploreSearchButton();
  bindCollapsibleFilters();
  bindClearFiltersButton();
  connectRecipeAction();
  buttonsEditCookbook();
  bindScaling();

  populateSelectCookbookOptions();
  bindSelectCookbookButtons();

  populateCookbooksPage();
  connectRecipeBackButton();
  connectCookbookBackButton();

  initializeDefaultCookbook();

  bindRecipeFormButtons();
}

window.addEventListener("DOMContentLoaded", init);

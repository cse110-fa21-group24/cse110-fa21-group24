import { Router } from "./router.js";
import { SpoonacularInterface } from "./spoonacular-interface.js";

const EXPLORE_PAGE_NUM_RESULTS = 6;

const router = new Router("home-page");
const spoonacular = new SpoonacularInterface();

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
 * Populates the cookbooks page with cookbook card elements and adds it to the
 * document
 * @function createCookbookCard
 */
function createCookbookCard() {
  "use strict";
  const cards = document
    .querySelector("cook-book")
    .shadowRoot.getElementById("cards");
  for (let i = 0; i < 4; i++) {
    const cookbookCard = document.createElement("cookbook-card");
    cookbookCard.classList.toggle("hidden");
    cards.append(cookbookCard);
  }
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
 * Creates the explore page and adds it to the document
 * @function createExplorePage
 */
function createExplorePage() {
  "use strict";
  const explorePage = document.createElement("explore-page");
  explorePage.classList.toggle("hidden");
  document.querySelector("body").append(explorePage);
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

function createRecipeCard(recipeObj) {
  "use strict";
  const recipeCard = document.createElement("recipe-card");
  const shadow = recipeCard.shadowRoot;
  shadow.getElementById("recipe-id").textContent = recipeObj.id;
  shadow.getElementById("recipe-card-title").textContent = recipeObj.title;
  shadow.getElementById("recipe-card-image").src = recipeObj.image;
  return recipeCard;
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

// function toggleExplorePageType() {
//   "use strict";
//   let shadow = document.querySelector("explore-page").shadowRoot;
//   let topLevel = shadow.getElementById("explore-top-level");
//   let loadButton = shadow.getElementById("load-button");
//   topLevel.classList.toggle("type-explore");

//   if (topLevel.classList.contains("type-explore")) {
//     loadButton.textContent = "Explore More";
//   } else {
//     loadButton.textContent = "Load More";
//   }
// }

async function populateExplorePage(/* TODO: filtersObj */) {
  "use strict";
  let shadow = document.querySelector("explore-page").shadowRoot;
  let topLevel = shadow.getElementById("explore-top-level");

  if (topLevel.classList.contains("type-explore")) {
    let recipes = await spoonacular.getRandomRecipes(EXPLORE_PAGE_NUM_RESULTS);
    shadow.getElementById("no-results-text").classList.add("hidden");
    let recipeCardsSection = shadow.getElementById("recipe-cards-section");

    for (let i = 0; i < recipes.length; ++i) {
      let recipeCard = createRecipeCard(recipes[i]);
      recipeCardsSection.append(recipeCard);
    }
  } else {
    // TODO: implement getting recipes with spoonacular.getRecipes(filterObj)
    // when using search bar in explore page
  }
}

function bindExploreMore() {
  "use strict";
  let shadow = document.querySelector("explore-page").shadowRoot;
  let topLevel = shadow.getElementById("explore-top-level");
  let recipeCardsSection = shadow.getElementById("recipe-cards-section");
  let loadButton = shadow.getElementById("load-button");

  loadButton.addEventListener("click", async () => {
    if (topLevel.classList.contains("type-explore")) {
      while (recipeCardsSection.firstChild) {
        recipeCardsSection.removeChild(recipeCardsSection.lastChild);
      }

      await populateExplorePage();
    } else {
      // TODO: implement use case for clicking Load More when in search mode
    }
  });
}

/**
 * Runs initial setup functions when the page first loads
 * @function
 */
async function init() {
  "use strict";
  createNavbar();
  createHomePage();

  createExplorePage();
  populateExplorePage();
  bindExploreMore();

  createCookbook();
  createFooterImg();

  createCookbookCard();
  createCreateCookbook();
  createNotificationRecipeAdded();
  createNotificationRecipeDeleted();
  createNotificationSelectCookbook();
  createRecipeForm();
  createRecipePage();
  createSingleCookbook();

  connectNavbarButtons();
}

window.addEventListener("DOMContentLoaded", init);

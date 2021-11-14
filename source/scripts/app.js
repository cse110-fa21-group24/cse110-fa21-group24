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
 * Creates a wave custom element and adds it to the document
 * @function
 */
function createFooterImg() {
  "use strict";
  const footerImg = document.createElement("footer-img");
  document.querySelector("body").append(footerImg);
}

/**
 * Creates a recipe form element and adds it to the document
 * @function
 */
function createCookbook() {
  "use strict";
  const cookbook = document.createElement("cook-book");
  cookbook.classList.toggle("hidden");
  document.querySelector("body").append(cookbook);
}

/**
 * Creates a recipe form element and adds it to the document
 * @function
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

function createRecipeForm() {
  "use strict";
  const recipeForm = document.createElement("recipe-form");
  recipeForm.classList.toggle("hidden");
  document.querySelector("body").append(recipeForm);
}

/**
 * Creates a form for creating a new cookbook and adds it to the document
 * @function
 */
function createCreateCookbook() {
  "use strict";
  const createCookbook = document.createElement("create-cookbook");
  // createCookbook.classList.toggle("hidden"); //TODO: UNCOMMENT WHEN HOME WIRED IN
  document.querySelector("body").append(createCookbook);
}

/**
 * Creates the explore page and adds it to the document. This
 * page starts off hidden.
 * @function
 */
function createExplorePage() {
  "use strict";
  const explorePage = document.createElement("explore-page");
  explorePage.classList.toggle("hidden");
  document.querySelector("body").append(explorePage);
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
        router.navigate("create-cookbook"); //TODO: CHANGE THIS TO HOME ELEMENT WHEN ADDED!!!
      });
    }

    if (buttons[i].textContent === "Explore") {
      buttons[i].addEventListener("click", () => {
        router.navigate("explore-page"); // Navigate to explore page
      });
    }

    if (buttons[i].textContent === "My Cookbooks") {
      buttons[i].addEventListener("click", () => {
        //TODO: router.navigate("PUT YOUR COOKBOOK UI ELEMENT NAME HERE");
      });
    }
  }
}
/**
 * Runs initial setup functions when the page first loads
 * @function
 */
async function init() {
  "use strict";
  createNavbar();
  createFooterImg();
  createRecipeForm();
  createCreateCookbook();
  createExplorePage();
  createFooterImg();
  connectNavbarButtons();
  createCookbook();
  createCookbookCard();
}

window.addEventListener("DOMContentLoaded", init);

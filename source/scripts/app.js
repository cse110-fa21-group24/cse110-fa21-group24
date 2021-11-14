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
function createRecipeForm() {
  "use strict";
  const recipeForm = document.createElement("recipe-form");
  // recipeForm.classList.toggle("hidden");
  document.querySelector("body").append(recipeForm);
}

/**
 * Runs initial setup functions when the page first loads
 * @function
 */
async function init() {
  "use strict";
  createNavbar();
  createRecipeForm();
  createFooterImg();
}

window.addEventListener("DOMContentLoaded", init);

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
 * Creates the explore page and adds it to the document
 * @function
 */
function createExplorePage() {
  "use strict";
  const explorePage = document.createElement("explore-page");
  console.log(explorePage);
  document.querySelector("body").append(explorePage);
}

/**
 * Runs initial setup functions when the page first loads
 * @function
 */
async function init() {
  "use strict";
  createNavbar();
  createExplorePage();
  createFooterImg();
}

window.addEventListener("DOMContentLoaded", init);

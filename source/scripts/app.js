import { Router } from "./router.js";

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
function connectNavbarButtons(router) {
  "use strict";
  let navbar = document.querySelector("custom-navbar");
  let shadow = navbar.shadowRoot;
  let buttons = shadow.querySelectorAll("button.navbar-tab");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === "Home") {
      buttons[i].addEventListener("click", () => {
        router.navigate(document.querySelector("footer-img")); //TODO: CHANGE THIS TO HOME ELEMENT WHEN ADDED!!!
      });
    }

    if (buttons[i].textContent === "Explore") {
      buttons[i].addEventListener("click", () => {
        router.navigate(document.querySelector("explore-page"));
      });
    }

    if (buttons[i].textContent === "My Cookbooks") {
      buttons[i].addEventListener("click", () => {
        //TODO: router.navigate(document.querySelector("PUT YOUR COOKBOOK UI ELEMENT NAME HERE"));
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
  createExplorePage();
  createFooterImg();

  //Create the router after all pages have been initialized!!!
  const router = new Router(document.querySelector("footer-img")); //TODO: CHANGE TO HOME ELEMENT WHEN ADDED IN!!!

  connectNavbarButtons(router);
}

window.addEventListener("DOMContentLoaded", init);

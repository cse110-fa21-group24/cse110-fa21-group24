function createNavbar() {
  "use strict";
  const navbar = document.createElement("custom-navbar");
  document.querySelector("body").append(navbar);
}

async function init() {
  "use strict";
  createNavbar();
}

window.addEventListener("DOMContentLoaded", init);

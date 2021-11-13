window.addEventListener("DOMContentLoaded", init);

function init() {
  // Establish references to HTML elements
  const body = document.querySelector("body");
  const navbar = document.createElement("top-navbar");
  navbar.data = ""; //Initializes shadow root
  const main = document.querySelector("main");

  //Insert navbar at top of page
  body.insertBefore(navbar, main);
}
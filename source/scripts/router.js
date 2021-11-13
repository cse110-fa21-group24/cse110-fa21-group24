/**
 * @classdesc A class that handles loading the appropriate screens when
 *            navigating through the web app
 */
export class Router {
  /**
   * This constructor stores the current page in order to tell when
   * and what to hide when navigating.
   *
   * @param {Element} currentPage
   */
  constructor(currentPage) {
    this.currentPage = currentPage;
  }

  /**
   * This function navigates to another page by toggling the "hidden" name
   * on the element's classList. If the current page is the one that is being
   * navigated to, then do nothing.
   *
   * @param {Element} page
   */
  navigate(page) {
    if (page === this.currentPage) {
      return;
    }

    let pageElement = document.querySelector(page);
    let currentElement = document.querySelector(this.currentPage);

    currentElement.classList.toggle("hidden");
    if (pageElement.classList.contains("hidden")) {
      this.currentPage = page;
      pageElement.classList.toggle("hidden");
    }
  }
}

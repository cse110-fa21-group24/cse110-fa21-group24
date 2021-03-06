/**
 * @classdesc A class that handles loading the appropriate screens when
 *            navigating through the web app
 */
export class Router {
  /**
   * @function constructor
   * @description This constructor stores the current page in order to tell when
   *              and what to hide when navigating.
   * @param {Element} currentPage sets the currentPage variable to the page the
   *                              user is currently on
   */
  constructor(currentPage, previousPage) {
    this.currentPage = currentPage;
    this.previousPage = previousPage;
  }

  /**
   * @function navigate
   * @description This function navigates to another page by toggling the
   *              "hidden" name on the element's classList. If the current page
   *              is the one that is being navigated to, then do nothing.
   * @param {Element} page the page that the user wants to go to
   */
  navigate(page) {
    // if navigating to same page as current, do nothing
    if (page === this.currentPage) {
      return;
    }

    // get references to elements
    let pageElement = document.querySelector(page);
    let currentElement = document.querySelector(this.currentPage);

    // hide the current page
    currentElement.classList.add("hidden");
    if (pageElement.classList.contains("hidden")) {
      //set previous page to the current page
      this.previousPage = this.currentPage;
      //Set new current page to page
      this.currentPage = page;
      // show the next page
      pageElement.classList.remove("hidden");
      // scroll to top of page
      document.querySelector("html").scrollTop = 0;
    }

    // hide pages and notifications that are not redirected to using
    // navigate(page)
    document
      .querySelector("notification-select-cookbook")
      .classList.add("hidden");
    document.querySelector("recipe-form").classList.add("hidden");
  }

  get prevPage() {
    return this.previousPage;
  }
}

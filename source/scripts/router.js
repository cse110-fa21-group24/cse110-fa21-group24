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
  constructor(currentPage, previousPage) {
    this.currentPage = currentPage;
    this.previousPage = previousPage;
  }

  /**
   * This function navigates to another page by toggling the "hidden" name
   * on the element's classList. If the current page is the one that is being
   * navigated to, then do nothing.
   *
   * @param {Element} page
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
    currentElement.classList.toggle("hidden");
    if (pageElement.classList.contains("hidden")) {
      //set previous page to the current page
      this.previousPage = this.currentPage;
      //Set new current page to page
      this.currentPage = page;
      // toggle hidden on page
      pageElement.classList.toggle("hidden");
      // scroll to top of page
      document.querySelector("html").scrollTop = 0;
    }

    // hide notification
    document
      .querySelector("notification-select-cookbook")
      .classList.add("hidden");
  }

  /**
   * This function navigates to the previous page by toggling the "hidden" name
   * on the element's classList. Only used by the back button.
   */
  return() {
    //Get references to elements
    let pageElement = document.querySelector(this.previousPage);
    let currentElement = document.querySelector(this.currentPage);

    //Hide the current page
    currentElement.classList.toggle("hidden");
    if (pageElement.classList.contains("hidden")) {
      //store the previousPage int the temp variable
      let temp = this.previousPage;
      //set previous page to the current page
      this.previousPage = this.currentPage;
      //Set new current page to page
      this.currentPage = temp;
      //Toggle hidden on page
      pageElement.classList.toggle("hidden");
      //Scroll to top of page
      document.querySelector("html").scrollTop = 0;
    }
  }
}

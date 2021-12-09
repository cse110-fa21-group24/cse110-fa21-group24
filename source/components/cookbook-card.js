/**
 * @classdesc A component in which users can create a card to represent a
 *            cookbook in the My Cookbooks page.
 */
class cookbookCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the cookbook for the given card and populates the text within it
   */
  set cookbook(cookbookObj) {
    if (!cookbookObj) {
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/cookbook-card.css";

    const card = document
      .getElementById("cookbook-card-template")
      .content.cloneNode(true);

    // store object within card for easy access
    this.cookbookObj = cookbookObj;

    // add cookbook info
    let titleText = card.querySelector(".title");
    titleText.textContent = cookbookObj.title;

    let descriptionText = card.querySelector(".detailed-description");
    descriptionText.textContent = cookbookObj.description;

    // add to element
    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(card);
  }

  get cookbook() {
    return this.cookbookObj;
  }
}

customElements.define("cookbook-card", cookbookCard);

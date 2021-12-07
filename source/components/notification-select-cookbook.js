/**
 * @classdesc A notification that shows up asking users to determine which 
 *            cookbook they would like to add the current recipe to
 *
 */
class NotificationSelectCookbook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/notification-select-cookbook.css";

    const notification = document
      .getElementById("notification-select-cookbook-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(notification);
  }

  set recipe(recipeObj) {
    this.recipeObj = recipeObj;
  }

  get recipe() {
    return this.recipeObj;
  }
}

customElements.define(
  "notification-select-cookbook",
  NotificationSelectCookbook
);

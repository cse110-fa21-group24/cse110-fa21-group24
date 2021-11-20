/**
 * @classdesc A notification that shows up when recipes are added
 *
 */
class NotificationRecipeAdded extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/notification-recipe-added.css";

    const notification = document
      .getElementById("notification-recipe-added-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(notification);
  }
}

customElements.define("notification-recipe-added", NotificationRecipeAdded);

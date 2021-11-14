/**
 * @classdesc A notification that shows up when recipes are deleted
 *
 */
class NotificationRecipeDeleted extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/notification-recipe-deleted.css";

    const notification = document.getElementById(
      "notification-recipe-deleted-template"
    ).content;

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(notification);
  }
}

customElements.define("notification-recipe-deleted", NotificationRecipeDeleted);

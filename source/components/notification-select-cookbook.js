/**
 * @classdesc A notification that shows up when selecting which cookbook to add
 *            recipes to
 *
 */
class NotificationSelectCookbook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/notification-select-cookbook.css";

    const notification = document.getElementById(
      "notification-select-cookbook-template"
    ).content;

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(notification);
  }
}

customElements.define(
  "notification-select-cookbook",
  NotificationSelectCookbook
);

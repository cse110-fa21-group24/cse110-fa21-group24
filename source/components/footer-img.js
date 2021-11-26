/**
 * @classdesc A custom element that represents a wave image at the bottom of
 *            the page
 */
class FooterImg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles/footer-img.css";

    const footerImg = document
      .getElementById("footer-img-template")
      .content.cloneNode(true);

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(footerImg);
  }
}

customElements.define("footer-img", FooterImg);

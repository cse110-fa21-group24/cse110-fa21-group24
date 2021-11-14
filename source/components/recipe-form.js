/**
 * @classdesc A template for the recipe form which allows users to edit
 *            their recipes and their details.
 *
 */
class RecipeForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/source/styles/recipe-form.css";

    const recipeForm = document.getElementById("recipe-form-template").content;

    this.shadowRoot.append(stylesheet);
    this.shadowRoot.append(recipeForm);
  }
}

customElements.define("recipe-form", RecipeForm);

/* jshint ignore:start */
require("dotenv").config();
/* jshint ignore:end */

/**
 * @classdesc An interface for fetching recipes and recipe information using
 *            the Spoonacular API at https://spoonacular.com/food-api
 */
export class SpoonacularInterface {
  async getRecipes(filtersObj) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      process.env.SPOONACULAR_API_KEY +
      "&instructionsRequired=true";

    for (const filter in filtersObj) {
      if (filtersObj.hasOwnProperty(filter)) {
        requestUrl += "&" + filter + "=" + filtersObj[filter];
      }
    }

    return this.makeRequest(requestUrl);
  }

  async getRandomRecipes(numResults) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      process.env.SPOONACULAR_API_KEY +
      "&instructionsRequired=true&sort=random" +
      "&number=" +
      numResults;

    return this.makeRequest(requestUrl);
  }

  async getRecipeInfo(id) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" +
      process.env.SPOONACULAR_API_KEY;

    return this.makeRequest(requestUrl);
  }

  async makeRequest(requestUrl) {
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }
}

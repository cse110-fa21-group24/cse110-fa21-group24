const SPOONACULAR_API_KEY = "83c84ad2b0e4486f93cfbe9658d21c66";

/**
 * @classdesc An interface for fetching recipes and recipe information using
 *            the Spoonacular API at https://spoonacular.com/food-api
 */
export class SpoonacularInterface {
  async getRecipes(filtersObj) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&instructionsRequired=true";

    for (const filter in filtersObj) {
      if (filtersObj.hasOwnProperty(filter)) {
        requestUrl += "&" + filter + "=" + filtersObj[filter];
      }
    }

    let responseData = await this.makeRequest(requestUrl);
    let recipes = {};

    for (let i = 0; i < responseData.results.length; ++i) {
      recipes[i] = {
        id: responseData.results[i].id,
        title: responseData.results[i].title,
        image: responseData.results[i].image,
      };
    }

    return recipes;
  }

  async getRandomRecipes(numResults) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&instructionsRequired=true&sort=random" +
      "&number=" +
      numResults;

    let responseData = await this.makeRequest(requestUrl);
    let recipes = {};

    for (let i = 0; i < responseData.results.length; ++i) {
      recipes[i] = {
        id: responseData.results[i].id,
        title: responseData.results[i].title,
        image: responseData.results[i].image,
      };
    }

    return recipes;
  }

  async getRecipeInfo(id) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" +
      SPOONACULAR_API_KEY;

    let recipe = await this.makeRequest(requestUrl);
    let ingredients = [];

    for (let i = 0; i < recipe.extendedIngredients.length; ++i) {
      ingredients.push(recipe.extendedIngredients[i].original);
    }

    let instructions = [];

    for (let i = 0; i < recipe.analyzedInstructions[0].steps.length; ++i) {
      instructions.push(recipe.analyzedInstructions[0].steps[i].step);
    }

    return {
      title: recipe.title,
      author: recipe.creditsText,
      cuisines: recipe.cuisines,
      readyInMinutes: recipe.readyInMinutes,
      image: recipe.image,
      description: recipe.summary,
      ingredients: ingredients,
      instructions: instructions,
    };
  }

  async makeRequest(requestUrl) {
    let response = await fetch(requestUrl);
    let data = await response.json();
    return data;
  }
}

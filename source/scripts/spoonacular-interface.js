const SPOONACULAR_API_KEY = "b1dfe789b60940b38f1768ccf739ffcf";
const MOCK_RECIPES_ARRAY = {
  results: [
    {
      id: 0,
      title: "title-0",
      image: "images/pasta.jpg",
    },
    {
      id: 1,
      title: "title-1",
      image: "images/pasta.jpg",
    },
    {
      id: 2,
      title: "title-2",
      image: "images/pasta.jpg",
    },
    {
      id: 3,
      title: "title-3",
      image: "images/pasta.jpg",
    },
    {
      id: 4,
      title: "title-4",
      image: "images/pasta.jpg",
    },
    {
      id: 5,
      title: "title-5",
      image: "images/pasta.jpg",
    },
  ],
};
const MOCK_RECIPE_INFO = {
  title: "title",
  creditsText: "author",
  cuisines: ["cuisine-0", "cuisine-1"],
  readyInMinutes: 10,
  image: "images/pasta.jpg",
  summary: "description",
  extendedIngredients: [
    { amount: 1, unit: "cup", name: "ingredient-0" },
    { amount: 3, unit: "cup", name: "ingredient-1" },
  ],
  analyzedInstructions: [
    { steps: [{ step: "instruction-1" }, { step: "instruction-2" }] },
  ],
};

// Change this variable to true to make real API calls to Spoonacular
let SPOONACULAR_ENABLED = true;

/**
 * @classdesc An interface for fetching recipes and recipe information using
 *            the Spoonacular API at https://spoonacular.com/food-api
 */
export class SpoonacularInterface {
  /**
   * Retrieves the ID, title, and image of several recipes
   * @param {object} filtersObj An object containing queries where keys
   *                            represent the query and key values represent
   *                            the query value
   * @returns {array} An array containing multiple smaller objects which
   *                  contain an ID title, and image for each retrieved recipe
   */
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
    let recipes = [];

    for (let i = 0; i < responseData.results.length; ++i) {
      recipes.push({
        id: responseData.results[i].id,
        title: responseData.results[i].title,
        image: responseData.results[i].image,
      });
    }

    return recipes;
  }

  /**
   * Retrieves the ID, title, and image of multiple random recipes
   * @param {number} numResults The number of recipes to retrieve
   * @returns {array} An array containing multiple smaller objects which
   *                  contain an ID title, and image for each retrieved recipe
   */
  async getRandomRecipes(numResults) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&instructionsRequired=true&sort=random" +
      "&number=" +
      numResults;

    let responseData = await this.makeRequest(requestUrl);
    let recipes = [];

    for (let i = 0; i < responseData.results.length; ++i) {
      recipes.push({
        id: responseData.results[i].id,
        title: responseData.results[i].title,
        image: responseData.results[i].image,
      });
    }

    return recipes;
  }

  /**
   * Retrieves detailed information about a recipe
   * @param {number} id The ID of the recipe to parse information from
   * @returns {object} An object containing several properties of the recipe
   */
  async getRecipeInfo(id) {
    let requestUrl =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" +
      SPOONACULAR_API_KEY;

    let recipe = await this.makeRequest(requestUrl);
    let ingredients = [];

    for (let i = 0; i < recipe.extendedIngredients.length; ++i) {
      let ingredientObj = {};
      ingredientObj.amount = recipe.extendedIngredients[i].amount;
      ingredientObj.unit = recipe.extendedIngredients[i].unit;
      ingredientObj.name = recipe.extendedIngredients[i].name;
      ingredients.push(ingredientObj);
    }

    let instructions = [];

    for (let i = 0; i < recipe.analyzedInstructions[0].steps.length; ++i) {
      instructions.push(recipe.analyzedInstructions[0].steps[i].step);
    }

    return {
      id: id,
      title: recipe.title,
      author: recipe.creditsText,
      cuisines: recipe.cuisines,
      readyInMinutes: recipe.readyInMinutes,
      image: recipe.image,
      description: recipe.summary,
      ingredients: ingredients,
      instructions: instructions,
      servings: recipe.servings,
    };
  }

  /**
   * An internal function that makes API calls
   * @param {string} requestUrl The url to fetch from
   * @returns {Promise} The data parsed from the response
   */
  async makeRequest(requestUrl) {
    if (!SPOONACULAR_ENABLED) {
      if (requestUrl.includes("complexSearch")) {
        return MOCK_RECIPES_ARRAY;
      } else {
        return MOCK_RECIPE_INFO;
      }
    }
    let response = await fetch(requestUrl);
    let data = await response.json();
    return data;
  }
}

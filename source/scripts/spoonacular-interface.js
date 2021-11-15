const SPOONACULAR_API_KEY = "83c84ad2b0e4486f93cfbe9658d21c66";
const MOCK_RECIPES_ARRAY = [
  {
    id: 0,
    title: "title-0",
    image: "/source/images/pasta.jpg",
  },
  {
    id: 1,
    title: "title-1",
    image: "/source/images/pasta.jpg",
  },
  {
    id: 2,
    title: "title-2",
    image: "/source/images/pasta.jpg",
  },
  {
    id: 3,
    title: "title-3",
    image: "/source/images/pasta.jpg",
  },
  {
    id: 4,
    title: "title-4",
    image: "/source/images/pasta.jpg",
  },
  {
    id: 5,
    title: "title-5",
    image: "/source/images/pasta.jpg",
  },
];
const MOCK_RECIPE_INFO = {
  title: "title",
  author: "author",
  cuisines: ["cuisine-0", "cuisine-1"],
  readyInMinutes: 10,
  image: "/source/images/pasta.jpg",
  description: "description",
  ingredients: ["ingredient-0", "ingredient-1"],
  instructions: ["instruction-0", "instruction-1"],
};

// Change this variable to true to make real API calls to Spoonacular
let SPOONACULAR_ENABLED = false;

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
   * @returns An array containing multiple smaller objects which contain an ID
   *          title, and image for each retrieved recipe
   */
  async getRecipes(filtersObj) {
    if (!SPOONACULAR_ENABLED) {
      return MOCK_RECIPES_ARRAY;
    }

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
   * @returns An array containing multiple smaller objects which contain an ID
   *          title, and image for each retrieved recipe
   */
  async getRandomRecipes(numResults) {
    if (!SPOONACULAR_ENABLED) {
      return MOCK_RECIPES_ARRAY;
    }

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
   * @returns An object containing several properties of the recipe
   */
  async getRecipeInfo(id) {
    if (!SPOONACULAR_ENABLED) {
      return MOCK_RECIPE_INFO;
    }

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

  /**
   * An internal function that makes API calls
   * @param {string} requestUrl The url to fetch from
   * @returns The data parsed from the response
   */
  async makeRequest(requestUrl) {
    if (!SPOONACULAR_ENABLED) {
      return;
    }

    let response = await fetch(requestUrl);
    let data = await response.json();
    return data;
  }
}

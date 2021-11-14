import { SpoonacularInterface } from "../spoonacular-interface";

let spoonacular = new SpoonacularInterface();

test("get recipe with queries", async () => {
  "use strict";
  spoonacular.makeRequest = jest.fn(() => {
    return {
      results: [
        {
          id: 0,
          title: "pasta recipe",
          image: "pasta image",
        },
      ],
    };
  });

  let queries = {
    cuisine: "italian",
    number: 1,
  };

  let recipes = await spoonacular.getRecipes(queries);

  expect(spoonacular.makeRequest).toHaveBeenCalled();
  expect(recipes[0].id).toEqual(0);
  expect(recipes[0].title).toMatch("pasta recipe");
  expect(recipes[0].image).toMatch("pasta image");
});

test("get one random recipe", async () => {
  "use strict";
  spoonacular.makeRequest = jest.fn(() => {
    return {
      results: [
        {
          id: 0,
          title: "random recipe",
          image: "random image",
        },
      ],
    };
  });

  let recipes = await spoonacular.getRandomRecipes(1);

  expect(spoonacular.makeRequest).toHaveBeenCalled();
  expect(recipes[0].id).toEqual(0);
  expect(recipes[0].title).toMatch("random recipe");
  expect(recipes[0].image).toMatch("random image");
});

test("get recipe info", async () => {
  "use strict";
  spoonacular.makeRequest = jest.fn(() => {
    return {
      title: "pasta recipe",
      creditsText: "an impasta",
      cuisines: ["italian"],
      readyInMinutes: 1,
      image: "pasta image",
      summary: "pasta dish",
      extendedIngredients: [
        {
          original: "pasta ingredient",
        },
      ],
      analyzedInstructions: [
        {
          steps: [
            {
              step: "make pasta",
            },
          ],
        },
      ],
    };
  });

  let recipe = await spoonacular.getRecipeInfo(0);

  expect(spoonacular.makeRequest).toHaveBeenCalled();
  expect(recipe.title).toMatch("pasta recipe");
  expect(recipe.author).toMatch("an impasta");
  expect(recipe.cuisines).toEqual(["italian"]);
  expect(recipe.readyInMinutes).toEqual(1);
  expect(recipe.image).toMatch("pasta image");
  expect(recipe.description).toMatch("pasta dish");
  expect(recipe.ingredients[0]).toMatch("pasta ingredient");
  expect(recipe.instructions[0]).toMatch("make pasta");
});

/**
 * @jest-environment jsdom
 */

test("add recipe-card element to document", () => {
  "use strict";
  let recipeCard = document.createElement("recipe-card");
  document.body.append(recipeCard);
  expect(document.body.innerHTML).toContain("<recipe-card></recipe-card>");
});

test("add recipe-card-delete element to document", () => {
  "use strict";
  let recipeCard = document.createElement("recipe-card-delete");
  document.body.append(recipeCard);
  expect(document.body.innerHTML).toContain(
    "<recipe-card-delete></recipe-card-delete>"
  );
});

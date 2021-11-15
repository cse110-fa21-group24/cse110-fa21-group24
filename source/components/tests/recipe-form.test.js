/**
 * @jest-environment jsdom
 */

test("add edit recipe form element to document", () => {
  "use strict";
  let recipeForm = document.createElement("recipe-form");
  document.body.append(recipeForm);
  expect(document.body.innerHTML).toContain("<recipe-form></recipe-form>");
});

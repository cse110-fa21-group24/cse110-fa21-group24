/**
 * @jest-environment jsdom
 */

test("add recipe page element to document", () => {
  "use strict";
  let recipePage = document.createElement("recipe-page");
  document.body.append(recipePage);
  expect(document.body.innerHTML).toContain("<recipe-page></recipe-page>");
});

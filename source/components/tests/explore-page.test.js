/**
 * @jest-environment jsdom
 */

test("add explore page element to document", () => {
  "use strict";
  let explorePage = document.createElement("explore-page");
  document.body.append(explorePage);
  expect(document.body.innerHTML).toContain("<explore-page></explore-page>");
});

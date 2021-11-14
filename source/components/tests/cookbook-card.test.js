/**
 * @jest-environment jsdom
 */

test("add cookbook-card element to document", () => {
  "use strict";
  let customNavbar = document.createElement("cookbook-card");
  document.body.append(customNavbar);
  expect(document.body.innerHTML).toContain("<cookbook-card></cookbook-card>");
});

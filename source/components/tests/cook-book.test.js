/**
 * @jest-environment jsdom
 */

test("add cookbook element to document", () => {
  "use strict";
  let customNavbar = document.createElement("cook-book");
  document.body.append(customNavbar);
  expect(document.body.innerHTML).toContain("<cook-book></cook-book>");
});

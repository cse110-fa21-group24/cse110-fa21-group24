/**
 * @jest-environment jsdom
 */

test("add navbar element to document", () => {
  "use strict";
  let customNavbar = document.createElement("custom-navbar");
  document.body.append(customNavbar);
  expect(document.body.innerHTML).toContain("<custom-navbar></custom-navbar>");
});

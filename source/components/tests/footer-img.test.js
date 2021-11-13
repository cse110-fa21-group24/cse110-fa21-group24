/**
 * @jest-environment jsdom
 */

test("add footerImg element to document", () => {
  "use strict";
  let footerImg = document.createElement("footer-img");
  document.body.append(footerImg);
  expect(document.body.innerHTML).toContain("<footer-img></footer-img>");
});

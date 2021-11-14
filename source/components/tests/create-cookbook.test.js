/**
 * @jest-environment jsdom
 */

test("add create cookbook element to document", () => {
  "use strict";
  let createCookbook = document.createElement("create-cookbook");
  document.body.append(createCookbook);
  expect(document.body.innerHTML).toContain(
    "<create-cookbook></create-cookbook>"
  );
});

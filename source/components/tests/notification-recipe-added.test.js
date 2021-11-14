/**
 * @jest-environment jsdom
 */

test("add recipe added notification element to document", () => {
  "use strict";
  let notification = document.createElement("notification-recipe-added");
  document.body.append(notification);
  expect(document.body.innerHTML).toContain(
    "<notification-recipe-added></notification-recipe-added>"
  );
});

/**
 * @jest-environment jsdom
 */

test("add recipe deleted notification element to document", () => {
  "use strict";
  let notification = document.createElement("notification-recipe-deleted");
  document.body.append(notification);
  expect(document.body.innerHTML).toContain(
    "<notification-recipe-deleted></notification-recipe-deleted>"
  );
});

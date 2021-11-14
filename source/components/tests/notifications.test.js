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

test("add recipe deleted notification element to document", () => {
  "use strict";
  let notification = document.createElement("notification-recipe-deleted");
  document.body.append(notification);
  expect(document.body.innerHTML).toContain(
    "<notification-recipe-deleted></notification-recipe-deleted>"
  );
});

test("add select cookbook notification element to document", () => {
  "use strict";
  let notification = document.createElement("notification-select-cookbook");
  document.body.append(notification);
  expect(document.body.innerHTML).toContain(
    "<notification-select-cookbook></notification-select-cookbook>"
  );
});

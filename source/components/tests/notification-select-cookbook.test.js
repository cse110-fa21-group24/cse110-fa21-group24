/**
 * @jest-environment jsdom
 */

test("add select cookbook notification element to document", () => {
  "use strict";
  let notification = document.createElement("notification-select-cookbook");
  document.body.append(notification);
  expect(document.body.innerHTML).toContain(
    "<notification-select-cookbook></notification-select-cookbook>"
  );
});

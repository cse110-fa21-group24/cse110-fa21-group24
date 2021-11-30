# Decide whether to instantly update recipes on a filter check

- Status: Accepted
- Date: 2021-11-24

## Context and Problem Statement

For our explore page, we have filters in the form of checkboxes that filter the displayed recipes. When a user clicks on these
boxes, should the displayed recipes instantly update, or should a user have to click "Enter" or a button on the screen to update
the recipes?

## Considered Options

- Have the user click "Enter" or the "Explore Recipes" button
- Instantly update the recipe after updating a filter
- Add an "Apply Filters" button

## Decision Outcome

Chosen option: Add an "Apply Filters" button because it is more apparent to the user what they are supposed to do as
opposed to the first option, and it will help us to preserve API points which could lead to extensive costs unlike
the second option. We felt that the one extra button press to apply the filters is better than spending extra money
for API calls and a laggy application that can be exploited by spamming our filters.

## Pros and Cons of the Options

### Have the user click "Enter" or the "Explore Recipes" button

- Good, because it is functional.
- Bad, because it can be misleading to users with unclear labels.

### Instantly update the recipe after updating a filter

- Good, because the recipe search is instant.
- Good, because this method gives feedback and is intuitive.
- Good, because it requires less button presses.
- Bad, because it uses many API points.
- Bad, because it can potentially lag if someone spams the filters.

### Add an "Apply Filters" button

- Good, because it fixes the misleading issue with option 1.
- Good, because it saves API points and only searches when the user is ready.
- Good, because it could potentially be less laggy than the second option.
- Bad, because it is not instant.
- Bad, because it requires an extra button press.

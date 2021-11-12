# Choose to use an API or not

* Status: Accepted
* Date: 2021-02-11

## Context and Problem Statement

We want to be able to provide recipe ideas to our users. Should we take the added risk of using an API in our product?

## Considered Options

* Use Spoonacular
* Have users create their own recipes

## Decision Outcome

Chosen option: "Use Spoonacular", because our app is directed towards beginner cooks. It is unlikely that beginner cooks will have their own recipes in mind. They will most likely look for inspiration. We could have populated the number of recipes manually, but this requires a large amount of work that can be easily done by an API.

## Pros and Cons of the Options

### Use Spoonacular

* Good, because Spoonacular can provide recipe ideas
* Good, because it fulfills the criteria with a relatively minimal amount of work
* Good, because Spoonacular has many filters that allow for adaptive features
* Good, because Spoonacular contains data that supports many of our feature ideas
* Bad, because Spoonacular may cost a little bit of money
* Bad, because Spoonacular adds complexity to our project

### Have users create their own recipes

* Good, because there is less complexity
* Good, because it fulfills the "Create" criteria in CRUD
* Bad, because in respective to our app, our users would rarely use this feature
* Bad, because users would not have inspiration for ideas upon entering the app for the first time
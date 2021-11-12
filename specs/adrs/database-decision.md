# Choose how to store user cookbooks

* Status: Accepted
* Date: 2021-11-04

## Context and Problem Statement

We want users to be able to store data on their recipes and refer to it later. We have other features in mind for the future relating to account creation. Given the time constraints, should we use an online database, local storage, or find another solution that solves the same problem?

## Considered Options

* Use MongoDB
* Use local database
* Construct some way to share cookbook data

## Decision Outcome

Chosen option: "Use local database", because MongoDB, the leading contender, requires extra complexity involving setting up servers which must be active upon a demo. Using a local database removes the unnecessary complexity and still meets the criteria of storing data for users to read later.

## Pros and Cons of the Options

### Use MongoDB
* Good, because allows account creation and cross-device capabilities.
* Good, because allows recipe sharing and other complex features in the future.
* Bad, because requires additional complexity in short amount of time.
* Bad, because considered required for MVP along with its complexity.

### Use Local Storage
* Good, because users can have their data persist after closing page.
* Good, because requires less complexity than MongoDB.
* Good, because we are confident about implementing it in the timeframe.
* Bad, because does not allow for account creation.

### Construct some way to share cookbook data
* Good, because able to keep data of a recipe after closing site.
* Bad, because very tedious for user to keep info on all saved recipes.
* Bad, because users are most familiar with link sharing, which is complex.
* Bad, because most methods of sharing that are not complex (copy paste data) are unorthodox.
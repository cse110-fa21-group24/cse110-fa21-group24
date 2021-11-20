# Choose how to store user cookbooks

* Status: Accepted
* Date: 2021-11-20

## Context and Problem Statement

We want to use a cloud service that can host our web app for free and is easy to configure and setup.

## Considered Options

* Heroku
* Netlify

## Decision Outcome

Netlify is easier to setup since our web app is just a simple JavaScript app. Netlify does not require any builds to be configure for the app, which is good because we do not use any scripts to build our app. Configuring Netlify is simple and it allows us to meet the our basic needs of deploying pushes to `main` with very little work on our end.

Heroku on the other hand is meant for deploying applications, not necessarily web apps/pages. Heroku, therefore, requires a build process, which we do not have configure for our project. Heroku also has more configurability than we need for the scope of our web app.

## Pros and Cons of the Options

### Heroku
* Pro: allows lots of configurability when it comes to build and deployment pipelines
* Con: requires that a build process in order to host an application
* Con: we are developing a single-page web application, which does not have a build process
* Con: In order to host with Heroku, we would need to implement a workaround to turn our website into a pure application

### Netlify
* Pro: automatically deploys on pushes to `main`
* Pro: relatively simple setup when integrating with GitHub
* Pro: Free plan has very little limitations
* Con: Have to manually setup deployment pipeline in GitHub Actions if we want `staging` and `production` branch setups

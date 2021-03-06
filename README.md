[![Coverage Status](https://coveralls.io/repos/github/andela-tezebuike/Trak-Bon-Docs/badge.svg?branch=feature%2F143671477%2Fimplement-feedback)](https://coveralls.io/github/andela-tezebuike/Trak-Bon-Docs?branch=feature%2F143671477%2Fimplement-feedback) [![Code Climate](https://codeclimate.com/github/andela-tezebuike/Trak-Bon-Docs/badges/gpa.svg)](https://codeclimate.com/andela-tezebuike/Trak-Bon-Docs) [![Build Status](https://travis-ci.org/andela-tezebuike/Trak-Bon-Docs.svg?branch=feature%2F143671477%2Fimplement-feedback)](https://travis-ci.org/andela-tezebuike/Trak-Bon-Docs)

# Trak-Bon-Docs
Trak-Bon-Docs is a fullstack document management system built on react with redux. It utilizes RESTFUL API architecture for managing documents, users and roles. Also, authentication is done using JWT.

## Application Features
#### User Authentication
Users are authenticated and validated using JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

#### User Activities
*   Create an account
*   Login with credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created by his access group with access level set as `role`.
*   Search a users public documents.
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents including documents with access set to private.
    -   Delete any user.
    -   Update any user's record.
    -   Create a new role.
    -   View all created roles.
    -   Search for any user.

## Development
This application was developed using the following frameworks.

*   [NodeJs](https://nodejs.org)
*   [React Redux](http://redux.js.org/docs/basics/UsageWithReact.html)
*   [express](https://expressjs.com/)
*   [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

## Installation
-   Ensure that you have NodeJs and Postgres installed on your machine
-   Clone the repository `$ git clone https://github.com/andela-tezebuike/Trak-Bon-Docs.git`
-   Change into the directory `$ cd TrakBon Docs`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory as described in `.env.sample` file

## Usage
-   Run DB setup command with  `npm run db:setup`. This will setup the database and seed some data
-   Run `npm start` to start the application on development environment

## Testing
-   Run Test `npm test`. This will clean the test database and setup it up before the test is run.
` I strongly suggest using separate DB for testing and development `

## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
* Click [here] to view the detailed documentation.


## Contribution
#### Prerequisites includes
-   [Postgresql](https://www.postgresql.org/) and
-   [Node.js](http://nodejs.org/) >= v7.9.0.

#### Procedure
1.  Clone this repository from a terminal `git clone https://github.com/andela-tezebuike/Trak-Bon-Docs.git`.
2.  Move into the project directory `cd TrakBon Docs`
3.  Install project dependencies `npm install`
4.  Create Postgresql database and run migrations `npm run db:setup`.
5.  Start the express server `npm run start`.
6.  Run test `npm test`.
7.  Branch out of master `git checkout -b [new-branch-name]`
8.  Make changes and commit your changes
9.  Git push and make a pull request to my repo

## Limitations
Currently, we can't say our API can handle larger requests, this may be a problem when our user base grows to over million.

## License
MIT

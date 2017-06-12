[![Coverage Status](https://coveralls.io/repos/github/andela-tezebuike/Trak-Bon-Docs/badge.svg)](https://coveralls.io/github/andela-tezebuike/Trak-Bon-Docs) [![Code Climate](https://codeclimate.com/github/andela-tezebuike/Trak-Bon-Docs/badges/gpa.svg)](https://codeclimate.com/andela-tezebuike/Trak-Bon-Docs) [![Build Status](https://travis-ci.org/andela-tezebuike/Trak-Bon-Docs.svg?branch=develop)](https://travis-ci.org/andela-tezebuike/Trak-Bon-Docs)

# Trak-Bon-Docs
Trak-Bon-Docs is a fullstack document management system built on react with redux. It utilizes RESTFUL API architecture for managing documents, users and roles. Also, authentication is done using JWT.

## Development
This application was developed using the following frameworks.

*   [NodeJs](https://nodejs.org)
*   [React Redux](http://redux.js.org/docs/basics/UsageWithReact.html)
*   [express](https://expressjs.com/)
*   [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

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
### API Features

The following features make up the Trak-Bon-Docs API:

#### Users
-   It allows users to be created.
-   It allows users to login and obtain a token
-   It allows authenticated users to retrieve and update their information.
-   It allows the admin to manage users.
-   It allows admin to search users based on a specified search term

##### Authentication
-   It uses JSON Web Token (JWT) for authentication.
-   It generates a token on successful login or account creation and returns it to the consumer.
-   It verifies the token to ensures a user is authenticated to access protected endpoints.

EndPoint                    |   Functionality
----------------------------|------------------------
POST /users/login           |   Logs a user in.
POST /users/logout          |   Logs a user out.
POST /users/                |   Creates a new user.
GET /users/                 |   Find matching instances of user.
GET /users/<id>             |   Find user.
PUT /users/<id>             |   Update user attributes.
DELETE /users/<id>          |   Delete user.
GET /users/<id>/documents   |   Find all documents belonging to the user.
GET /search/users/?q=${query}   |   Gets all users with username contain the search term

#### Roles
-   It ensures roles can be created, retrieved, updated and deleted by an admin user.
-   A non-admin user cannot create, retrieve, modify, or delete roles.
-   it allows for assignment of roles to users

EndPoint                    |   Functionality
----------------------------|------------------------
POST /roles/                |   Creates a new role instance.
GET /roles/                 |   Find matching instances of role.
GET /roles/<id>             |   Find role.
PUT /roles/<id>             |   Update role attributes.
DELETE /roles/<id>          |   Delete role.

#### Documents
-   It allows new documents to be created by authenticated users.
-   It ensures all documents are accessible based on the permission specified.
-   It allows admin users to retrieve all documents.
-   It ensures users can delete, edit and update documents that they own.
-   It allows users to retrieve all documents assigned to their role as well as public documents.
-   It allows users to search documents they have access to for a specified search term.
-   It allows admin to retrieve all documents that matches search term.

EndPoint                    |   Functionality
----------------------------|------------------------
POST /documents/            |   Creates a new document instance.
GET /documents/             |   Find matching instances of document.
GET /documents/<id>         |   Find document.
PUT /documents/<id>         |   Update document attributes.
DELETE /documents/<id>      |   Delete document.
GET /search/documents/?q={query}| Get all documents with title containing the search query

#### Folders
-   It ensures folders can be created, retrieved, updated and deleted by a user.
-   Users can only create, retrieve, modify, or delete their own folders.
-   it allows for assignment of documents to folders

EndPoint                    |   Functionality
----------------------------|------------------------
POST /folders/              |   Creates a new folder instance.
GET /folders/               |   Find matching instances of folder.
GET /folders/<id>           |   Find folder.
PUT /folders/<id>           |   Update folder attributes.
DELETE /folders/<id>        |   Delete folder.


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
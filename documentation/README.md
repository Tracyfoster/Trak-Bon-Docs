The Trak-Bon-Docs API contains several end points that allow users to create, edit, retrieve and delete documents. In addition, it
contains API end points that allow the management of users i.e. create, edit, retrieve, delete users and roles. 

Development
-----------
The application was developed with [NodeJS](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [Sequelize](http://sequelizejs.com) as the ORM

## API ENDPOINTS
**Users**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
POST | [/users/login](#login) | To log a user in
POST | [/users/login](#login) | To log a user in

**Roles**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
DELETE | [/role/:id](#delete-a-role) | To delete a role

**Documents**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Delete a specific document
GET | [/documents?offset=0&limit=10](#get-documents) | Pagination for document retrieval

**Search**

Request type | Endpoint | Action
------------ | -------- | ------
GET | [/search/documents/](#search-document) | Search for documents
GET | [/search/users?={}](#search-user) | Search for users

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "firstName": "John",
    "lastName": "Favie"
    "email": "faviej@gmail.com",
    "password":"password",
    "roleId": 2

}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Favie"
    "roleId": 2,
    "updatedAt": "2017-06-03T12:19:45.740Z",
    "createdAt": "2017-06-03T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Requires `Authorization` header to be set
#### Response
```
{
"metaData": {
  "totalCount": 20,
  "currentPage": 1,
  "pageCount": 4,
  "pageSize": 5
},
"users": [
  {
    "id": 1,
    "firstName": "Arden",
    "lastName": "Leannon"
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
    "roleId": 3
  },
  {
    "id": 2,
    "firstName": "Marquis",
    "lastName": "Walker"
    "createdAt": "2017-05-28T01:26:21.992Z",
    "updatedAt": "2017-05-28T01:26:21.992Z",
    "roleId": 3
  },
  {
    "id": 3,
    "firstName": "John",
    "lastName": "Favie"
    "createdAt": "2017-05-28T01:28:17.185Z",
    "updatedAt": "2017-05-28T01:28:17.185Z",
    "roleId": 3
  },
  {
    "id": 4,
    "firstName": "Nora",
    "lastName": "Ortiz"
    "createdAt": "2017-05-28T01:31:14.617Z",
    "updatedAt": "2017-05-28T01:31:14.617Z",
    "roleId": 3
  },
  {
    "id": 5,
    "firstName": "Vernice",
    "lastName": "Conn"
    "createdAt": "2017-05-28T01:32:24.079Z",
    "updatedAt": "2017-05-28T01:32:24.079Z",
    "roleId": 3
  }
  ]
}
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
    "id": 4,
    "firstName": "Nora",
    "lastName": "Ortiz"
    "createdAt": "2017-05-28T01:31:14.617Z",
    "updatedAt": "2017-05-28T01:31:14.617Z",
    "roleId": 3
  },
```
## Update user
#### Request
  - Endpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "roleId": 2
}
```
#### Response
```
{
    "id": 4,
    "firstName": "Nora",
    "lastName": "Ortiz"
    "createdAt": "2017-05-28T01:31:14.617Z",
    "updatedAt": "2017-05-28T01:31:14.617Z",
    "roleId": 2
  },
```

## Delete user
#### Request
  - Endpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User deleted successfully."
}
```

## User login
### Request
 - Endpoint: **POST**: `/users/login`
```
{
    "username": "faviej@gmail.com",
    "password":"password"
}
```

### Response
```
{
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Favie"
    "roleId": 2,
    "updatedAt": "2017-06-03T12:19:45.740Z",
    "createdAt": "2017-06-03T12:19:45.740Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlJvbGVJZCI6MSwiaWF0IjoxNDkyNzczMzc4LCJleHAiOjE0OTI4NTk3Nzh9.6C9u-1ylQOUpTQDVPm0TmIuVmDaP2PMgMxLkP1sjI"
}
```

# Get user's Document
### Request
  - Endpoint: **GET**: `/users/:id/documents`
  - Requires `Authorization` header to be set

### Response
```
{
"documents": [
  {
    "id": 1,
    "title": "Sam does the lunch again",
    "content": "Hi, Johny. This tell a lot about you",
    "access": "public",
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z",
    "userId": 1
  },
  {
   "id": 2,
   "title": "If you get it",
    "content": "Things to buy for momma",
    "access": "private",
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z",
    "userId": 3
  },
  {
    "id": 3,
    "title": "Sharp",
    "content": "She no get opportunity and she quick marry...",
    "access": "public",
    "createdAt": "2017-05-20T15:16:03.978Z",
    "updatedAt": "2017-05-20T15:37:42.021Z",
    "userId": 1
  },
  {
    "id": 4,
    "title": "ada ada",
    "content": "Have you seen my beautiful baby?",
    "access": "public",
    "createdAt": "2017-05-26T13:30:58.441Z",
    "updatedAt": "2017-05-28T18:13:11.951Z",
    "userId": 4
  },
  {
    "id": 5,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "userId": 2
  }
],
"metaData": {
  "totalCount": 5,
  "currentPage": 1,
  "pageCount": 1,
  "pageSize": 5
}
}
```

ROLES
-----
## Create Role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "author"
}
```
#### Response
Body (application/json)
```
{
  "id": 4,
  "title": "author",
  "updatedAt": "2017-04-21T11:24:44.344Z",
  "createdAt": "2017-04-21T11:24:44.344Z"
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "userRole": "Super Admin",
    "createdAt": "2017-05-20T14:00:23.296Z",
    "updatedAt": "2017-05-20T14:00:23.296Z"
  },
  {
    "id": 2,
    "userRole": "Admin",
    "createdAt": "2017-05-20T14:00:33.765Z",
    "updatedAt": "2017-05-20T14:00:33.765Z"
  },
  {
    "id": 3,
    "userRole": "Regular",
    "createdAt": "2017-05-20T14:00:38.504Z",
    "updatedAt": "2017-05-20T14:00:38.504Z"
  }
]
```

## Delete Role
#### Request
  - Endpoint **DELETE** `/roles/:id`
  - Requires `Authorization` header to be set
#### Response
Body (application/json)
```
{
  "message": "Role successfully deleted."
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "We have got holes in our hearts",
  "content": "...and in our lives. But we carry on.",
  "access": "public",
  "userId": 2
}
```
#### Response
  - Body `(application/json)`
```
{
    "id": 5,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "userId": 2
  }
```
## Get Documents
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **offset** (where to start from) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
[
  {
    "id": 3,
    "title": "Sharp",
    "content": "She no get opportunity and she quick marry...",
    "access": "public",
    "createdAt": "2017-05-20T15:16:03.978Z",
    "updatedAt": "2017-05-20T15:37:42.021Z",
    "userId": 1
  },
  {
    "id": 4,
    "title": "ada ada",
    "content": "Have you seen my beautiful baby?",
    "access": "public",
    "createdAt": "2017-05-26T13:30:58.441Z",
    "updatedAt": "2017-05-28T18:13:11.951Z",
    "userId": 4
  },
  {
    "id": 5,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "userId": 2
  }
]
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
    "id": 5,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "userId": 2
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "Kako Onikumekun",
}
```
##### Response
```
{
  "id": 1,
  "title": "Kako Onikumekun",
  "content": "...and in our lives. But we carry on.",
  "access": "public",
  "createdAt": "2017-05-28T21:24:24.762Z",
  "updatedAt": "2017-05-28T21:24:24.762Z",
  "userId": 2
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  message: 'Document deleted.'
}
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?q=ar`
  - Requires `Authorization` header to be set
#### Response
```
{
  "users": [
    {
    "id": 1,
    "firstName": "Arden",
    "lastName": "Leannon"
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
    "roleId": 3
  },
  {
    "id": 2,
    "firstName": "Marquis",
    "lastName": "Walker"
    "createdAt": "2017-05-28T01:26:21.992Z",
    "updatedAt": "2017-05-28T01:26:21.992Z",
    "roleId": 3
  },
  ],
  "metaData": {
    "totalCount": 2,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 1
  }
}
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?q=and`
  - Requires `Authorization` header to be set
#### Response
```
{
  "documents": [
    {
    "id": 3,
    "title": "Sharp",
    "content": "She no get opportunity and she quick marry...",
    "access": "public",
    "createdAt": "2017-05-20T15:16:03.978Z",
    "updatedAt": "2017-05-20T15:37:42.021Z",
    "userId": 1
  },
  {
    "id": 5,
    "title": "We have got holes in our hearts",
    "content": "...and in our lives. But we carry on.",
    "access": "public",
    "createdAt": "2017-05-28T21:24:24.762Z",
    "updatedAt": "2017-05-28T21:24:24.762Z",
    "userId": 2
  }
  ],
  "metaData": {
    "totalCount": 3,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 3
  }
}
```

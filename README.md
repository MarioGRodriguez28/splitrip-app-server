# splitrip-app-server

# SPLITRIP

<br>

## Description

Thee easiest way to share expenses with friends and family and stop stressing about “who owes who”. Millions of people around the world use Splitrip to organize group bills for households, trips, and more.

This is a repository for a project called "splitrip-app-server". This repository contains the server-side code for a web application that allows users to split travel expenses among a group of people.

The repository is written in JavaScript using Node.js and Express.js. It also uses MongoDB as its database. The code includes routes for handling user authentication, managing trips and expenses, and generating reports.

It appears to be an open-source project, which means that anyone can contribute to it or use it as a starting point for their own project. It may be helpful to read through the code and documentation to better understand how it works and how it could be used.

## User Stories

- **db/index.js:** This is a JavaScript code snippet that is using the Mongoose package to connect to a MongoDB database.

First, it imports the Mongoose package using the 'require' keyword.

Then, it sets the MongoDB URI for the app to have access to it. It checks if a process environment variable named 'MONGODB_URI' is set. If it is, then it uses that URI. Otherwise, it uses the default URI "mongodb://127.0.0.1:27017/splitrip-app-server". This URI is the connection string for a local MongoDB server running on the default port 27017, and the database name is set to "splitrip-app-server".

After setting the URI, the code uses the 'connect' method of the Mongoose package to connect to the MongoDB server. It returns a promise that resolves to the 'x' object, which contains information about the connection. In this code, it extracts the database name from the first connection and logs it to the console as a confirmation that the connection was successful.

If there is an error connecting to the MongoDB server, it logs an error message to the console.

- **error-handlin/index.js:** This is a JavaScript code snippet that exports a function that takes an Express.js app object as a parameter. It registers two error-handling middleware functions with the app object.

The first middleware function is used to handle 404 errors. It runs whenever a requested page is not available. It sets the response status to 404 and sends a JSON object with a message property that says "This route does not exist".

The second middleware function is used to handle all other errors. It runs whenever an error is passed to the 'next' function (i.e., whenever an error occurs). It logs the error to the console using the 'console.error' method.

It then checks if the error has a status of 401. If it does, it sets the response status to 401 and sends a JSON object with an errorMessage property that says "Token no existe o no valido". This is likely for handling authentication errors.

If the error does not have a status of 401, or if it has already sent headers, it sets the response status to 500 and sends a JSON object with a message property that says "Internal server error. Check the server console". This is a generic error message that is sent if there is an error that is not specifically handled elsewhere in the code.

Overall, this code sets up error-handling middleware functions that help to handle errors that may occur during the execution of the Express.js application.

- **middlewares/auth.middlewares.js** This code snippet imports a function called 'expressjwt' from the 'express-jwt' package and defines a middleware function called 'esAutentificado' that uses this function to authenticate users using JSON Web Tokens (JWTs).

The 'expressjwt' function is configured with the following options:

'secret': This is the JWT secret that will be used to verify the signature of the token. It is taken from the 'TOKEN_SECRET' environment variable.
'algorithms': This is an array of algorithms that will be used to verify the token signature. In this case, only the 'HS256' algorithm is used.
'requestProperty': This is the name of the property that will be added to the request object to store the decoded JWT payload. In this case, it is set to 'payload'.
'getToken': This is a function that extracts the JWT from the request headers. It checks if the request headers contain a 'Bearer' token and returns the token if it is present. If the token is not present or is not a 'Bearer' token, it returns null.
The 'esAutentificado' middleware function exports the middleware function for use in route handlers. It uses the 'expressjwt' function to authenticate the request and set the 'payload' property of the request object if the request is authenticated.

## Backlog

- Travel bucket list
- Travel piggy bank
- Books media
- Email invitation
- Add more members to the groups
- Improve styles
- Time when is created a group
- Time when is created a expense

<br>

# Backend

## API Endpoints (backend routes)

- **routes/auth.routes.js** his is a Node.js module that defines several routes for a REST API related to user authentication and management using the Express.js framework. Here is a brief overview of the routes defined in this module:

POST /api/auth/signup: This route handles user registration. It expects a username and password in the request body, validates the inputs, and creates a new user document in the database using the User model defined in a separate file. It uses the bcrypt library to hash the password before storing it in the database.

POST /api/auth/login: This route handles user login. It expects a username and password in the request body, finds the corresponding user document in the database, validates the password using the bcrypt library, generates a JSON Web Token (JWT) using the jsonwebtoken library, and sends the JWT as a response.

GET /api/auth/verify: This route is a protected route that requires a valid JWT to access. It verifies the JWT using the esAutentificado middleware (defined in a separate file), extracts the user information from the JWT payload, and sends it as a response.

GET /api/users: This route returns a list of all user documents in the database.

POST /api/auth/addToUserGroups: This route adds a user to a group. It expects a username and groupName in the request body, validates the inputs, and calls a separate addToUserGroupsService function to add the user to the specified group.

POST /api/auth/user/addGroups: This route adds one or more groups to a user. It expects a username and an array of group names in the request body, finds the corresponding user document in the database, updates the groups array with the new group names, and saves the updated document to the database.

- **routes/expenses.routes.js** This is a Node.js module that exports a router object containing several routes for managing expenses. Here is a brief description of each route:

GET "/api/expenses/": This route returns a list of all expenses in the database.

POST "/api/expenses/": This route creates a new expense in the database. It requires the user to be authenticated.

GET "/api/expenses/:expensesId": This route returns the details of a single expense with the specified ID.

DELETE "/api/expenses/:expensesId": This route deletes an expense with the specified ID from the database.

PATCH "/api/expenses/:expensesId": This route updates the details of an expense with the specified ID in the database.

The module uses the Express.js framework and Mongoose library for interacting with MongoDB. It also uses a middleware function called "esAutentificado" to authenticate the user before allowing them to create a new expense.

- **routes/groups.routes.js** This code is a Node.js module that defines a router for handling HTTP requests related to managing groups and expenses. The module exports the router object, which can be used by the main Node.js application to handle incoming HTTP requests.

The code defines several routes:

A POST route for creating a new group. This route requires that the user is authenticated, and expects the group name and members as parameters. If successful, the route returns the created group.
A GET route for retrieving all the groups that the authenticated user is a member of. This route requires that the user is authenticated. If successful, the route returns an array of groups.
A GET route for retrieving the details of a specific group. This route expects the group ID as a parameter. If successful, the route returns the group details, including the members.
A DELETE route for deleting a specific group. This route expects the group ID as a parameter. If successful, the route returns a success message.
A PATCH route for updating a specific group. This route expects the group ID, group name, and members as parameters. If successful, the route returns a success message.
The code also requires the express module and the Group and Expenses models, which are used to interact with the MongoDB database. Additionally, the code requires the auth.middlewares module, which defines middleware functions for authenticating users.

- **routes/index.routes.js** This is the main router of the application, which is responsible for handling all incoming requests to the server. It includes three sub-routers, authRoutes, groupRoutes, and expensesRoutes, which handle authentication, group management, and expenses management, respectively.

The router.get('/', ...) function defines a basic route that simply returns a JSON response saying "All good in here". This route is useful for testing if the server is up and running.

The router.use(...) function is used to mount the specified router middleware function(s) at the path(s) in the server. So, in this case, the authRoutes, groupRoutes, and expensesRoutes middleware functions will be used to handle requests with the corresponding base paths (/auth, /groups, and /expenses).

<br>

# Server / Backend

## Models

User model

```javascript
 {
    username: { type: String, required: true, unique: true, trim: true},
    password: { type: String, required: true },
    groups: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Group' } ],
  },
  {
    timestamps: true,
  },

```

Expenses model

```javascript
{
 {
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item: { type: String },
    ammount: { type: Number },
    id_group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  },
  {
    timestamps: true,
  },
}
```

Group model

```javascript
 {
    Id_user: { type: mongoose.Schema.Types.ObjectId,  ref: 'User' },
    groupName: { type: String },
    members: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  },
  {
    timestamps: true,
  }
```

<br>

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/MarioGRodriguez28/splitrip-app-client.git)

[Server repository Link](https://github.com/MarioGRodriguez28/splitrip-app-server.git)

[Deployed App Link](https://splitrip.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](pendding)

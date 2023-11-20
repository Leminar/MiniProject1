# miniporject 4

This repository contains a simple Node.js server that utilizes the http module to handle requests and serves an HTML page rendered from an EJS template. The server is set up to respond to a specific GET request (/api/users) by reading user data from a JSON file, rendering it using EJS, and sending the HTML response.

# Code Explanation
1. Reading User Data

The server reads user data from a JSON file (users.json) using fs.promises and async/await.

2. Rendering EJS Template

The EJS template (users.ejs) is read using fs.promises and then rendered with the user data using ejs.render.

3. Sending HTML Response

The rendered HTML is sent as the response with a status code of 200.

4. Handling 404 Error

If the requested URL does not match /api/users, a 404 error is sent as the response.

5. Handling 500 Error

Any unhandled errors during the process result in a 500 Internal Server Error response.

## Usage

1. Clone this repository to your local machine.

2. Install the required dependencies by running:

Access the user API endpoint by visiting http://localhost:3000/api/users.
  
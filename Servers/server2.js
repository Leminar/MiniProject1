const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Use CORS middleware to allow cross requests
app.use(cors());

// Define a route that handles GET requests to '/api/users'
app.get('/api/users', (req, res) => {
 
  // Read the contents of 'users.json' file asynchronously
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const users = JSON.parse(data);

    // Send a JSON response containing the user data
    res.json(users);
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

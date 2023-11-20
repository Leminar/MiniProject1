const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3000;


//1. Set the views directory and the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//2. Path to the users.json file
const usersFilePath = path.join(__dirname, 'users.json');

//3. Read users data from the users.json file on server startup
async function readUsersData() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
  }
}

//4. Call the function to read users data
readUsersData();

app.get('/api/users', async (req, res) => {
  try {
    //5. Simulate fetching user data from a database or other asynchronous operation
    const userData = await fetchDataFromDatabase();

    //6. Render the users.ejs template with the fetched user data
    res.render('users', { users: userData });
  } catch (error) {
    console.error('Error in /api/users:', error);
    res.status(500).send(`${error}`);
  }
});

//7. Function to simulate fetching data from a database
async function fetchDataFromDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api/users`);
});

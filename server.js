const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());

app.get('/api/users', (req, res) => {
 
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const users = JSON.parse(data);

    res.json(users);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

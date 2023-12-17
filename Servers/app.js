// Step 1: Implement file operations using Node.js's fs and path modules.
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Step 2: HTML area for the default page
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Homepage</title>
        </head>
        <body>
          <a href="/api/users">Users</a>
          <h1>Welcome to the homepage!</h1>
        </body>
      </html>
    `;
    res.end(html);
  } else if (req.method === 'GET' && req.url === '/api/users') {
    // Step 3: Handle the GET request for '/api/users' as before
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      const users = JSON.parse(data);
      const formattedUsers = users.map(user => `id: ${user.id}, name: ${user.name}`).join('\n');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(formattedUsers);
    });
  } else if (req.method === 'POST' && req.url === '/api/users') {
    // Step 4: Handle the POST request for '/api/users' as before
    
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', () => {
      try {
        const newUser = JSON.parse(requestBody);
        // Step 5: Read the existing user data from the 'users.json' file
        fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
          }

          const users = JSON.parse(data);
          newUser.id = users.length + 1; 
          users.push(newUser);

          // Additional step: Write the updated user data back to 'users.json'
          fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users), 'utf8', (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
            }

            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('User added successfully');
          });
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error request');
      }
    });
  } else {
    // Step 6: Handle other routes with a 404 response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
  console.log('Access user <http://localhost:3000/api/users>');
});

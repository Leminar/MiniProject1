const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');

const requestHandler = async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      //1. Read user data from a file using Promises and async/await
      const filePath = path.join(__dirname, 'users.json');
      const data = await fs.readFile(filePath, 'utf8');
      const userData = JSON.parse(data);

      //2. Render the EJS template with user data
      const template = await fs.readFile(path.join(__dirname, 'users.ejs'), 'utf8');
      const renderedHtml = ejs.render(template, { userData });

      //3. Send the rendered HTML as the response
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderedHtml);
    } else {
      //4. Handle 404 error not found
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    //5. Handle 500 Internal Server Error
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/api/users>');
});

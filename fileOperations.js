const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const filePath = path.join(__dirname, 'example.txt');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve an HTML page with a textarea and buttons
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <textarea id="inputText"></textarea><br />
          <button onclick="displayText()">Display Text</button>
          <button onclick="clearText()">Clear Text</button>
          <p id="displayText"></p>
          <script>
            function displayText() {
              const inputText = document.getElementById('inputText').value;
              const displayArea = document.getElementById('displayText');
              displayArea.textContent = inputText;
              fetch('/updateFile', {
                method: 'POST',
                body: inputText,
              });
            }

            function clearText() {
              const inputText = document.getElementById('inputText');
              inputText.value = '';
              const displayArea = document.getElementById('displayText');
              displayArea.textContent = '';
              fetch('/clearFile');
            }

            // Update the textarea with the content of example.txt on page load
            fetch('/readFile')
              .then((response) => response.text())
              .then((data) => {
                document.getElementById('inputText').value = data;
              });
          </script>
        </body>
      </html>
    `;
    res.end(html);
  } else if (req.method === 'POST' && req.url === '/updateFile') {
    // Handle POST request to update the example.txt file
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('File updated successfully.');
        }
      });
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File updated successfully.');
    });
  } else if (req.method === 'GET' && req.url === '/readFile') {
    // Handle GET request to read the example.txt file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/clearFile') {
    // Handle GET request to clear the example.txt file
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        console.error('Error clearing file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        console.log('File cleared successfully.');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File cleared successfully.');
      }
    });
  } else {
    // Handle other HTTP methods or paths if needed
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on <http://localhost>:${PORT}`);
});

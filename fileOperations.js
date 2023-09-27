// Step 1: Import required Node.js modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Step 2: Define constants and file path
const PORT = 3000;
const filePath = path.join(__dirname, 'example.txt');

// Step 3: Create an HTTP server
const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {

// Step 4: Serve an HTML page with a textarea and buttons
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
  }

// Step 5: Read the incoming data (text) and write it to the "example.txt" file
  else if (req.method === 'POST' && req.url === '/updateFile') {
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
  }

  // Step 6:Read the content of the "example.txt" file and respond with it
  else if (req.method === 'GET' && req.url === '/readFile') {
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
  }

  // Step 7: Clear the content of the "example.txt" file and respond with success
  else if (req.method === 'GET' && req.url === '/clearFile') {
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
  }
});

// Step 8: Start the HTTP server and listen on  port 3000
server.listen(PORT, () => {
  console.log(`Server running on <http://localhost>:${PORT}`);
});

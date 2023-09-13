# miniproject1
This Node.js application provides a simple web-based text file editor. Users can input text, display it, clear it, and save it to a file using a web interface. Below is a brief overview of the key components and functionality of this application:

How It Works
Server Setup: The application creates an HTTP server using Node.js to handle incoming requests.

Web Interface: When you access the application in your web browser at http://localhost:3000/, you are presented with a web page containing:

A textarea for entering text.
A "Display Text" button to display and save the entered text.
A "Clear Text" button to clear the textarea and the displayed text.
A display area to show the entered text.
Display Text: Clicking the "Display Text" button takes the text entered in the textarea, displays it in the display area on the web page, and saves it to a file named "example.txt."

Clear Text: Clicking the "Clear Text" button clears both the textarea and the displayed text on the web page. It also clears the content of the "example.txt" file.

Read File: The application allows you to read the content of the "example.txt" file by fetching it and displaying it in the textarea. This is done automatically when you load the web page.
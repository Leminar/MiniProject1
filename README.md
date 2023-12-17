# Mini Project 5: React Basics

This project demonstrates the integration of a React front-end with a Node.js back-end. It covers fundamental React concepts such as JSX syntax, functional and class components, props, state management, event handling, conditional rendering, rendering lists, and API integration. The React app fetches user data from a RESTful API and displays it in a shuffled order.


- `client`: Contains the React front-end code.
- `server`: Contains the Node.js back-end code.

## Running the Project

To run the project, follow these steps:

1. **Start the Node.js Backend Server**:
   
   - Start the Node.js server:
     
     node server.js
     

2. **Start the React Front-end**:
   - Navigate to the `client` directory:
     
     cd client
     
   - Start the React development server:
     
     npm start
     

3. Access your React app in a web browser at http://localhost:3000.

## Components

### App.js (Functional Component)

This is the entry point of the React app. It renders the `UserContainer` component.

### UserList.js (Functional Component)

This component displays a list of users received as props.

### UserContainer.js (Class Component)

This component manages state and handles API interactions. It fetches user data from the Node.js,shuffles it and passes it to `UserList`.





# Mini-Project 10: Web Security

This is a simple workout management application built with React for the frontend and Node.js with Express for the backend. It allows users to register, log in, view workouts, add new workouts, and manage their workout data.

## Features

- User Registration: Users can create new accounts by providing a username and password.
- User Authentication: Registered users can log in to access their accounts.
- Workout Management: Logged-in users can view a list of workouts, add new workouts, and edit/delete their own workouts.
- Role-Based Access Control: Different roles (e.g., 'user' and 'admin') have different levels of access to certain routes.
- Token-Based Authentication: JSON Web Tokens (JWT) are used for secure user authentication.
- MongoDB Database: User and workout data is stored in a MongoDB database using Mongoose.

## Installation


1. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
2. Navigate to the `backend` directory and run `npm install` to install backend dependencies.
3. Configure the MongoDB connection by editing the `mongoURI` in the backend code.
4. Start the frontend and backend servers separately using `npm start` in their respective directories.

## Usage

- Access the application in your web browser at `http://localhost:3000`.
- Register a new account or log in with existing credentials.
- View, add, edit, or delete workouts based on your role and permissions.
- Log out of your account when done.


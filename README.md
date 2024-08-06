# Task Management Application

This is a task management application similar to Trello, allowing users to create, update, and manage tasks within different columns. Users can move tasks between columns using drag-and-drop functionality. Additionally, users can sign up and log in to manage their tasks.

## Live Demo

- **Backend**: [Live](https://trello-app-eaq2.onrender.com/)
- **Frontend**: [Demo URL](https://trello-app-frontend-psi.vercel.app/)

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - JWT Authentication
  - TypeScript
  - MongoDB

- **Frontend**:
  - React
  - Redux
  - React-dnd
  - React-router-dom
  - Chakra UI

## Features
- User can registration and login
- Create, read, update, and delete tasks
- Drag-and-drop tasks between columns
- Reorder tasks within the same column
- Authentication required on every page


## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env

    PORT=<your-port || 3000>
    MongoDB_URL=<your-mongodb-url>
    JWT_SECRET_KEY=<your-jwt-secret-key>
    JWT_SECRET_KEY_EXPIRE=<according to you>
    ```

4. **Start the backend server:**

    ```bash
    npm start
    ```

5. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6. **Start the frontend development server:**

    ```bash
    npm start
    ```

## Contributing

Feel free to submit issues and pull requests if you have suggestions for improvements or bug fixes.



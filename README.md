# MERN Stack Bookstore Project

A full-stack Bookstore application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application enables users to browse books, manage their profile, add books to favorites, and place orders. Administrators have extended capabilities to manage the book inventory.

## 🚀 Features

### User Features
- **Authentication**: Secure Signup and Login functionality using JWT.
- **Browse Books**: View a list of all available books and recently added ones.
- **Book Details**: View detailed information about each book.
- **Favorites**: Add interesting books to a personal favorites list.
- **Cart & Ordering**: Add books to the cart and place orders.
- **Order History**: View past orders and their status.
- **Profile Management**: customizable user profiles.
- **Responsive Design**: optimized for desktop and mobile devices.

### Admin Features
- **Dashboard**: Access to admin-specific controls.
- **Add Books**: Create new book entries with details like image, title, author, price, and description.
- **Edit Books**: Update existing book details.
- **Delete Books**: Remove books from the inventory.
- **Manage Orders**: View and update the status of user orders.

## 🛠️ Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **Vite**: Next Generation Frontend Tooling.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux Toolkit**: State management for authentication and global application state.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **React Icons**: Icon library.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Oject Data Modeling (ODM) library for MongoDB.
- **JSON Web Token (JWT)**: For secure user authentication.
- **Bcrypt**: For password hashing.

## 📂 Project Structure

```
BookStore/
├── backend/          # Node.js & Express API
│   ├── conn/         # Database connection
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── ...
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/    # Redux store
│   │   └── ...
│   └── ...
└── ...
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd BookStore
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add your variables:
    ```env
    PORT=3000
    URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-secret-key>
    ```
    Start the backend server:
    ```bash
    npm start
    ```

3.  **Frontend Setup**
    Navigate to the frontend directory and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
    Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the Application**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.



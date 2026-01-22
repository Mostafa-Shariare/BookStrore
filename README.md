# 📚 Boighor BD – 2nd-Hand Book Platform for Students

Boighor BD is a **full-stack MERN application** that helps Bangladeshi students **buy, sell, or donate second-hand books at affordable prices**.

## 🚀 Quick Start

If you have **Node.js** and **MongoDB** installed, here is how to get running in 2 minutes:

### 1. Backend
```bash
cd backend
npm install
npm run seed  # (Optional) Populates DB with demo data
npm start
```
*Server runs on local port 1000 or 3000 (check console).*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Open the link shown (usually http://localhost:5173).*

---

## 🛠️ Detailed Setup Guide

### prerequisites
1.  **Node.js**: [Download Here](https://nodejs.org/) (Version 14+ recommended)
2.  **MongoDB**: You need a running MongoDB instance.
    *   **Local**: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
    *   **Cloud**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd BookStrore
```

### 2️⃣ Backend Setup
The backend handles the database and API logic.

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the `backend/` directory and add the following:
    ```env
    PORT=3000
    URI=mongodb://localhost:27017/bookStore
    JWT_SECRET=MySuperSecretKey123!
    ```
    *   **PORT**: The port the server runs on (default 3000).
    *   **URI**: Your MongoDB connection string. If using **MongoDB Atlas**, replace the value with the connection string they provide.
    *   **JWT_SECRET**: Any random string used to sign login tokens.

4.  **(Optional) Seed Database:**
    To populate the app with sample books and users (Admin + Regular User):
    ```bash
    npm run seed
    ```

5.  **Start the Server:**
    ```bash
    npm start
    ```
    You should see: `Server started at the port 3000` and `Connected to database`.

### 3️⃣ Frontend Setup
The frontend is the user interface built with React.

1.  **Open a NEW terminal window** (keep the backend running).

2.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

5.  **View the App:**
    Open your browser and visit: `http://localhost:5173` (or whatever URL Vite displays).

---

## 🔐 Demo Accounts

If you ran `npm run seed`, these accounts are available:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `password123` |
| **User** | `rahman` | `password123` |
| **User** | `fatima` | `password123` |

---

## 🐛 Troubleshooting

### Common Issues

**1. "Connection refused" or Database Error**
*   **Cause**: MongoDB is not running locally.
*   **Fix**: Start MongoDB (e.g., `sudo systemctl start mongod` on Linux) or check your Atlas URI string in `.env`.

**2. Frontend cannot login (API Error)**
*   **Cause**: Backend is not running or running on a different port.
*   **Fix**: Ensure backend is running on port `3000`. If you changed the port in `.env`, you must also update the API calls in `frontend/src` (currently hardcoded to 3000).

**3. "Address already in use"**
*   **Cause**: Another program is using port 3000.
*   **Fix**: Kill the process using the port (`npx kill-port 3000`) or change the `PORT` in `.env`.

---

## 📂 Project Structure

```
BookStrore/
├── backend/
│   ├── conn/          # Database configuration
│   ├── models/        # Database Schemas (User, Book, Order)
│   ├── routes/        # API Endpoints
│   ├── seed.js        # Script to create demo data
│   └── app.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Full page views (Login, Home, etc.)
    │   └── store/      # Redux state management
    └── vite.config.js
```

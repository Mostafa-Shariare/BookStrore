# 📚 Boighor BD – 2nd-Hand Book Platform for Students

Boighor BD is a **full-stack MERN application** that helps Bangladeshi students **buy, sell, or donate second-hand books at affordable prices**. The platform focuses on reducing educational costs, encouraging reuse, and supporting students from low-income backgrounds.

---

## 🚀 Features

### 👤 User Features

* **Authentication**: Secure signup and login using JWT & Bcrypt
* **Browse Books**: View all available books (Sell & Donate)
* **Book Details**: See book condition, price, category, and description
* **Sell Books**: List used books with images and pricing
* **Donate Books**: Mark books as free for donation
* **Search & Filter**: Filter by category, type (Sell / Donate), and availability
* **Cart & Orders**: Add books to cart and place orders
* **Order History**: Track previous purchases
* **Profile Management**: Manage user information
* **Responsive Design**: Works smoothly on mobile and desktop

---

### 🛠️ Admin Features

* **Admin Dashboard**
* **Manage Books**: Add, edit, or delete book listings
* **Moderation**: Approve or remove inappropriate listings
* **Manage Orders**: View and update order status

---

## 🌍 Purpose & Impact

* Makes textbooks affordable for underprivileged students
* Encourages book reuse and sustainability
* Builds a student-driven sharing economy
* Supports both selling and donating books

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **Redux Toolkit**
* **React Router DOM**
* **Axios**
* **React Icons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (Authentication)**
* **Bcryptjs**
* **CORS**

---

## 📂 Project Structure

```
Boighor-BD/
├── backend/
│   ├── conn/          # Database connection
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   └── seed.js        # Demo data
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/     # Redux store
│   │   └── utils/
│   └── ...
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

* Node.js (v14+)
* MongoDB (Local or Atlas)

---

### 🔧 Installation

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd Boighor-BD
```

---

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

(Optional) Seed demo data:

```bash
npm run seed
```

Start backend:

```bash
npm start
```

---

#### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

#### 4️⃣ Access App

Open browser:

```
http://localhost:5173
```

---

## 🔐 Demo Accounts (Seeded)

| Role  | Username | Password    |
| ----- | -------- | ----------- |
| Admin | admin    | password123 |
| User  | rahman   | password123 |
| User  | fatima   | password123 |

---

## 🧠 Future Improvements

* NGO-verified donation system
* AI-based fair price suggestions
* Mobile app support
* SMS-based access for rural users

---


## 📄 License

This project is licensed under the **MIT License**.


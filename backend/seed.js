const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Book = require("./models/books");
const Order = require("./models/order");

// Reuse same connection string as conn/conn.js
const MONGO_URI = "mongodb://localhost:27017/bookStore";

async function connect() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for seeding");
}

async function clearExisting() {
  await Promise.all([
    User.deleteMany({}),
    Book.deleteMany({}),
    Order.deleteMany({}),
  ]);
  console.log("Cleared existing users, books, and orders");
}

async function createUsers() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const [admin, user] = await User.create([
    {
      username: "admin",
      email: "admin@example.com",
      password: passwordHash,
      address: "123 Admin Street, Admin City",
      role: "admin",
    },
    {
      username: "john",
      email: "john@example.com",
      password: passwordHash,
      address: "456 Reader Lane, Booktown",
      role: "user",
    },
  ]);

  console.log("Created demo users (admin / john, password: password123)");
  return { admin, user };
}

async function createBooks() {
  const books = await Book.create([
    {
      url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      title: "The Silent Library",
      author: "Emily Hart",
      price: 14.99,
      desc: "A gripping mystery set in an old city library where secrets are buried between the shelves.",
      language: "English",
    },
    {
      url: "https://images.unsplash.com/photo-1528208079124-0f642dd89fda?auto=format&fit=crop&w=600&q=80",
      title: "Journey Beyond the Horizon",
      author: "Liam Carter",
      price: 19.5,
      desc: "An inspiring travelogue about chasing sunsets, oceans, and the meaning of home.",
      language: "English",
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      title: "Code & Coffee",
      author: "Ava Mitchell",
      price: 24.0,
      desc: "A modern guide for developers who want to write clean code and build meaningful careers.",
      language: "English",
    },
    {
      url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
      title: "Whispers of the Forest",
      author: "Noah Bennett",
      price: 16.75,
      desc: "A calming collection of short stories that blend nature, folklore, and quiet magic.",
      language: "English",
    },
  ]);

  console.log(`Created ${books.length} demo books`);
  return books;
}

async function createSampleOrder(user, books) {
  // Create one order per book for the user
  const orders = [];
  for (const book of books.slice(0, 3)) {
    const order = await Order.create({
      user: user._id,
      book: book._id,
      status: "Order Placed",
    });
    orders.push(order);
  }

  // Attach orders to user document
  user.orders = orders.map((o) => o._id);
  await user.save();

  console.log(`Created ${orders.length} demo orders for user ${user.username}`);
}

async function run() {
  try {
    await connect();
    await clearExisting();

    const { admin, user } = await createUsers();
    const books = await createBooks();
    await createSampleOrder(user, books);

    console.log("Seeding completed successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

run();


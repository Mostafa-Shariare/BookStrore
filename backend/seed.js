const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Book = require("./models/books");
const Order = require("./models/order");

// Reuse same connection string as conn/conn.js
const MONGO_URI = "mongodb://localhost:27017/bookStore";

// Data arrays for generating diverse books
const CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"];
const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla", 
  "History", "Geography", "ICT", "Economics", "Accounting", "Business Studies",
  "Social Science", "Science", "Religion", "Arts", "Home Science"
];
const BOARDS = ["Dhaka", "Chittagong", "Rajshahi", "Comilla", "Jessore", "Barisal", "Sylhet", "Dinajpur", "National"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];
const BOOK_IMAGES = [
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1528208079124-0f642dd89fda?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
];

const AUTHORS = [
  "Dr. Muhammad Zafar Iqbal", "NCTB", "Dr. Shahjahan Tapan", "Dr. Muhammad Ali",
  "Dr. Anwar Hossain", "Dr. Abul Kashem", "Dr. Humayun Azad", "Kazi Nazrul Islam",
  "Rabindranath Tagore", "Dr. Jafar Iqbal", "Dr. Selina Hossain", "Dr. Abdur Razzak",
  "Prof. Dr. Md. Shahidullah", "Dr. Mofazzal Hossain", "Dr. Mamunur Rashid"
];

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

  const [admin, user1, user2] = await User.create([
    {
      username: "admin",
      email: "admin@boighorbd.com",
      password: passwordHash,
      address: "Dhaka, Bangladesh",
      role: "admin",
    },
    {
      username: "rahman",
      email: "rahman@example.com",
      password: passwordHash,
      address: "Chittagong, Bangladesh",
      role: "user",
    },
    {
      username: "fatima",
      email: "fatima@example.com",
      password: passwordHash,
      address: "Rajshahi, Bangladesh",
      role: "user",
    },
  ]);

  console.log("Created demo users (admin / rahman / fatima, password: password123)");
  return { admin, user1, user2 };
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBookDescription(title, subject, classLevel) {
  const descriptions = [
    `Complete textbook for ${classLevel} students covering all essential topics in ${subject}. Well-structured content with examples and exercises.`,
    `Comprehensive guide to ${subject} for ${classLevel} level. Includes detailed explanations, solved problems, and practice questions.`,
    `${subject} textbook designed for ${classLevel} curriculum. Contains theory, practical examples, and exam preparation materials.`,
    `Essential ${subject} book for ${classLevel} students. Features clear explanations, diagrams, and chapter summaries.`,
    `Study material for ${subject} at ${classLevel} level. Includes curriculum-aligned content with exercises and review sections.`,
  ];
  return getRandomElement(descriptions);
}

async function createBooks(admin, user1, user2) {
  const users = [admin, user1, user2];
  const books = [];
  const totalBooks = 75; // Generate 75 books (between 50-100)
  
  // Mix of sell and donate (70% sell, 30% donate)
  const sellRatio = 0.7;
  const donateRatio = 0.3;
  
  // Status distribution (85% approved, 10% pending, 5% can be varied)
  const approvedRatio = 0.85;
  
  for (let i = 0; i < totalBooks; i++) {
    const isDonate = Math.random() < donateRatio;
    const seller = getRandomElement(users);
    const isAdmin = seller.role === "admin";
    
    // Admin posts are auto-approved, regular users have pending chance
    const status = isAdmin || Math.random() < approvedRatio ? "Approved" : "Pending";
    
    const classLevel = getRandomElement(CLASSES);
    const subject = getRandomElement(SUBJECTS);
    const board = getRandomElement(BOARDS);
    const condition = getRandomElement(CONDITIONS);
    const author = getRandomElement(AUTHORS);
    const image = getRandomElement(BOOK_IMAGES);
    
    // Price based on class and condition
    let price = 0;
    if (!isDonate) {
      const basePrice = classLevel.includes("HSC") || classLevel.includes("SSC") ? 400 : 
                       parseInt(classLevel) >= 9 ? 350 : 
                       parseInt(classLevel) >= 6 ? 250 : 150;
      
      const conditionMultiplier = condition === "New" ? 1.2 : 
                                  condition === "Like New" ? 1.0 : 
                                  condition === "Good" ? 0.8 : 
                                  condition === "Fair" ? 0.6 : 0.4;
      
      price = Math.floor(basePrice * conditionMultiplier);
      price = Math.max(50, price); // Minimum 50 taka
    }
    
    const title = `${subject} - ${classLevel}`;
    const desc = generateBookDescription(title, subject, classLevel);
    
    books.push({
      url: image,
      title: title,
      author: author,
      price: price,
      desc: desc,
      language: Math.random() > 0.3 ? "Bengali" : "English", // 70% Bengali
      type: isDonate ? "Donate" : "Sell",
      condition: condition,
      class: classLevel,
      subject: subject,
      board: board,
      seller: seller._id,
      status: status,
    });
  }

  const createdBooks = await Book.insertMany(books);
  
  const approvedCount = createdBooks.filter(b => b.status === "Approved").length;
  const pendingCount = createdBooks.filter(b => b.status === "Pending").length;
  const sellCount = createdBooks.filter(b => b.type === "Sell").length;
  const donateCount = createdBooks.filter(b => b.type === "Donate").length;
  
  console.log(`✅ Created ${createdBooks.length} books:`);
  console.log(`   - ${sellCount} for sale, ${donateCount} for donation`);
  console.log(`   - ${approvedCount} approved, ${pendingCount} pending moderation`);
  console.log(`   - Classes: ${[...new Set(createdBooks.map(b => b.class))].slice(0, 5).join(", ")}...`);
  console.log(`   - Subjects: ${[...new Set(createdBooks.map(b => b.subject))].slice(0, 5).join(", ")}...`);
  console.log(`   - Boards: ${[...new Set(createdBooks.map(b => b.board))].join(", ")}`);
  
  return createdBooks;
}

async function createSampleOrder(user, books) {
  // Create orders for approved books that are for sale
  const approvedBooks = books.filter(b => b.status === "Approved" && b.type === "Sell");
  const orders = [];
  
  // Create 2-3 orders
  const orderCount = Math.min(3, approvedBooks.length);
  for (let i = 0; i < orderCount; i++) {
    const randomBook = approvedBooks[Math.floor(Math.random() * approvedBooks.length)];
    if (!orders.find(o => o.book.toString() === randomBook._id.toString())) {
      const order = await Order.create({
        user: user._id,
        book: randomBook._id,
        status: "Order Placed",
      });
      orders.push(order);
    }
  }

  // Attach orders to user document
  if (orders.length > 0) {
    user.orders = orders.map((o) => o._id);
    await user.save();
    console.log(`   Created ${orders.length} sample orders for user ${user.username}`);
  }
}

async function run() {
  try {
    await connect();
    await clearExisting();

    const { admin, user1, user2 } = await createUsers();
    const books = await createBooks(admin, user1, user2);
    await createSampleOrder(user1, books);

    console.log("\n✅ Seeding completed successfully!");
    console.log("\n📚 Demo Accounts:");
    console.log("   Admin: admin / password123");
    console.log("   User 1: rahman / password123");
    console.log("   User 2: fatima / password123");
    console.log("\n📖 Book Collection Features:");
    console.log("   - Diverse classes from Class 1 to HSC");
    console.log("   - Multiple subjects including Math, Science, Languages, Social Studies");
    console.log("   - Various boards across Bangladesh");
    console.log("   - Mix of sell and donation listings");
    console.log("   - Different book conditions");
    console.log("   - Some books pending admin moderation");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

run();

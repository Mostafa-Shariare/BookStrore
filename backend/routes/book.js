const express = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Book = require("../models/books")
const {authenticateToken} = require("./userAuth")

// Add book - Now allows regular users to list books (sell/donate)
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Regular users can list books for sale/donation
    // Only admins can approve them (status: Pending by default)
    
    const bookData = {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.type === "Donate" ? 0 : (req.body.price || 0),
      desc: req.body.desc,
      language: req.body.language,
      type: req.body.type || "Sell",
      condition: req.body.condition || "Good",
      class: req.body.class || "",
      subject: req.body.subject || "",
      board: req.body.board || "",
      seller: id,
      status: user.role === "admin" ? "Approved" : "Pending", // Admin posts are auto-approved
    };

    const book = new Book(bookData);
    await book.save();
    
    res.status(201).json({ 
      message: user.role === "admin" 
        ? "Book added successfully" 
        : "Book listed successfully! It will be reviewed by admin before going live."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//update book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.headers;
    const { id } = req.headers; // user id
    
    const book = await Book.findById(bookid);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Only seller or admin can update
    const user = await User.findById(id);
    if (book.seller.toString() !== id && user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update this book" });
    }

    const updateData = {
      url: req.body.url,
      title: req.body.title, 
      author: req.body.author,
      desc: req.body.desc,
      language: req.body.language,
      condition: req.body.condition,
      class: req.body.class,
      subject: req.body.subject,
      board: req.body.board,
    };

    // Price and type handling
    if (req.body.type) {
      updateData.type = req.body.type;
      if (req.body.type === "Donate") {
        updateData.price = 0;
      } else {
        updateData.price = req.body.price || 0;
      }
    } else if (req.body.price !== undefined) {
      updateData.price = req.body.price;
    }

    // Admin can change status
    if (user.role === "admin" && req.body.status) {
      updateData.status = req.body.status;
    }

    await Book.findByIdAndUpdate(bookid, updateData);

    return res.status(200).json({
      message: "Book updated successfully"
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }
})

//delete book
router.delete("/delete-book", authenticateToken, async(req, res) => {
 try {
  const { bookid } = req.headers;
  const { id } = req.headers;
  
  const book = await Book.findById(bookid);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Only seller or admin can delete
  const user = await User.findById(id);
  if (book.seller.toString() !== id && user.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized to delete this book" });
  }

  await Book.findByIdAndDelete(bookid);
  return res.status(200).json({
    message: "Book deleted successfully"
  })
  
 } catch (error) {
  console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  
 }
})
 
//get all books - Now supports filtering
router.get("/get-all-books", async (req, res) => {
  try {
    const { class: classFilter, subject, board, type, search, status } = req.query;
    
    let query = {};

    // Only show approved books to regular users (unless admin is filtering)
    // In production, you'd check if user is admin, but for now show all to everyone
    // You can add authentication check here if needed
    if (status) {
      query.status = status;
    } else {
      // Default: show only approved books
      query.status = "Approved";
    }

    if (classFilter) query.class = classFilter;
    if (subject) query.subject = subject;
    if (board) query.board = board;
    if (type) {
      if (type === "Donate") {
        query.$or = [{ type: "Donate" }, { price: 0 }];
      } else {
        query.type = "Sell";
        query.price = { $gt: 0 };
      }
    }

    // Search in title, author, subject
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const books = await Book.find(query)
      .populate("seller", "username email")
      .sort({ createdAt: -1});
    
    return res.json({
      status: "Success",
      data: books,
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }

})


//get recently added books limit to 4 (only approved)
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find({ status: "Approved" })
      .populate("seller", "username")
      .sort({ createdAt: -1})
      .limit(4);
    return res.json({
      status: "Success",
      data: books,
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }

})

//get book by id
router.get("/get-book-by-id/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("seller", "username email");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({
      status: "Success",
      data: book,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
})

// Get books by seller (for user's own listings)
router.get("/get-my-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const books = await Book.find({ seller: id }).sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Admin: Get pending books for moderation
router.get("/get-pending-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const books = await Book.find({ status: "Pending" })
      .populate("seller", "username email")
      .sort({ createdAt: -1 });
    
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Admin: Approve or reject book
router.put("/moderate-book/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id } = req.headers;
    const { status } = req.body; // "Approved" or "Rejected"
    
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await Book.findByIdAndUpdate(bookId, { status });
    
    return res.json({
      status: "Success",
      message: `Book ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

const express = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Book = require("../models/books")
const {authenticateToken} = require("./userAuth")

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    // userId will come from decoded JWT
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform admin work" });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title, // fixed here
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


//update book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.headers;
  await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title, 
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,

  })

  return res.status(200).json({
    message: "Book Update sucessfully"
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
  await Book.findByIdAndDelete(bookid);
  return res.status(200).json({
    message: "Book Deleted successfully"
  })
  
 } catch (error) {
  console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  
 }
})
 
//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1});
    return res.json({
      status: "Success",
      data: books,
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }

})


//get recently added books limit to 4
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1}).limit(4);
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
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
    
  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
    

    
  }
})


module.exports = router;
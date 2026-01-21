const mongoose = require("mongoose");

const books = new mongoose.Schema({

    url:{
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0, // 0 for donated books
    },
    desc: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Sell", "Donate"],
        default: "Sell",
        required: true
    },
    condition: {
        type: String,
        enum: ["New", "Like New", "Good", "Fair", "Poor"],
        default: "Good",
        required: true
    },
    class: {
        type: String,
        required: false // e.g., "Class 5", "Class 10", "HSC", "SSC"
    },
    subject: {
        type: String,
        required: false // e.g., "Mathematics", "English", "Physics"
    },
    board: {
        type: String,
        required: false // e.g., "Dhaka", "Chittagong", "Rajshahi", "National"
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Sold", "Donated"],
        default: "Pending"
    }
},
 { timestamps: true}
)


module.exports = mongoose.model("books", books);


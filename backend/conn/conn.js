const mongoose = require("mongoose")

const conn = async () => {
    try {
        await mongoose.connect(`${process.env.URI || "mongodb://localhost:27017/bookStore"}`);
        console.log("Connected to database")

    } catch (error) {
        console.log(error)
    }
}

conn()
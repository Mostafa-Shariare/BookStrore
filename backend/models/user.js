const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,

    },
    password : {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true,
        
    },
    avater: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLk_pj2Eee_Y8rJhgGrfusEV5owncPIKNEqg&s"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
        type: mongoose.Types.ObjectId,
        ref: "books"
    },
    ],
    cart: [
        {
        type: mongoose.Types.ObjectId,
        ref: "books"

        }
    ],
     orders: [
        {
        type: mongoose.Types.ObjectId,
        ref: "order"

        }
    ],
   
},
 { timestamps: true}
)

module.exports = mongoose.model("user", user);
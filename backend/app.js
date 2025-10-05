const express = require("express")
const app = express();
require("dotenv").config();

require("./conn/conn")

const user = require("./routes/user")
const book = require("./routes/book")
const favourite = require("./routes/favourite")
const cart = require("./routes/cart")
const oder = require("./routes/order");
const order = require("./models/order");

app.use(express.json())



//routes
app.use("/api/v1", user)
app.use("/api/v1", book)
app.use("/api/v1", favourite)
app.use("/api/v1", cart)
app.use("/api/v1", order)




app.get("/", (req, res) => {
    res.send("hello from backend side")
})

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`server started at the port ${process.env.PORT}`)
})
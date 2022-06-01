import mongoose from "mongoose"
// specify the name of your db at the end of url
mongoose.connect("mongodb://127.0.0.1:27017/wetube")

const db = mongoose.connection;

const handleError = (error) => console.log("❌ DB Error", error)
const handleOpen = () => console.log("✅ Connected to DB")
 

// if error occurs
db.on("error", handleError)
// when we are connected. Open happens only ONCE. and error happens many times.
db.once("open", handleOpen)

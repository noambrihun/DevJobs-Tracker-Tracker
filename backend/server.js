const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log("Mongo connection error", err))

console.log("MONGO_URI", process.env.MONGO_URI)
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Server works " })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
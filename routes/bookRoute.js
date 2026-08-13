const express = require("express")
const { newBook, allBooks, findBook, updateBook, deleteBook } = require("../controller/bookController")
const autMiddleware = require("../middleware/authMiddleware")

const bookRoute = express.Router()

bookRoute.post("/books",autMiddleware, newBook)
bookRoute.get("/books",autMiddleware, allBooks)
bookRoute.get("/books",autMiddleware, findBook)
bookRoute.put("/books",autMiddleware, updateBook)
bookRoute.delete("/books",autMiddleware, deleteBook)

module.exports = bookRoute
const express = require("express")
const { newBook, allBooks, findBook, updateBook, deleteBook } = require("../controller/bookController")
const autMiddleware = require("../middleware/authMiddleware")

const bookRoute = express.Router()

bookRoute.post("/books",autMiddleware, newBook)
bookRoute.get("/books",autMiddleware, allBooks)
bookRoute.get("/books/:id",autMiddleware, findBook)
bookRoute.put("/books/:id",autMiddleware, updateBook)
bookRoute.delete("/books/:id",autMiddleware, deleteBook)

module.exports = bookRoute
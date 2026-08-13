const bcrypt = require("bcrypt")
const Book = require("../models/bookModel")

const newBook = async (req,res) => {
const {title, author, ISBN, publicationDate} = req.body

    if(!title || !author || !ISBN || !publicationDate){
        return res.status(400).send({
            message: "Invalid Input"
        })
    }

    const existingBook = await Book.findOne({ISBN: ISBN})

    if(existingBook){
        return res.status(400).send({
            message: "Book already exist"
        })
    }

    const book = await Book({
        title : title,
        author : author,
        ISBN : ISBN,
        publicationDate : publicationDate
    })

    await book.save()

    return res.status(200).send({
        message: "Book created succesfully"
    })
}

const allBooks = async (req,res) => {
    const bookList = await Book.find()

    return res.status(200).send(bookList)
}

const findBook = async (req,res) => {
    const {id} = req.params

    const book = await Book.findByIdAndDelete(id)

        if(!book){
        return res.status(400).send({
            message : "Book is not found"
        })
    }
    
    return res.status(200).send(book)
}

const updateBook = async (req,res) => {
    const {id} = req.params

    const books = await Book.findByIdAndUpdate(id, req.body)

    if(!books){
        return res.status(400).send({
            message : "Book is not found"
        })
    }

    return res.status(200).send({
        message: "Book updated succefully"
    })    
}

const deleteBook = async (req,res) => {
    const {id} = req.params

    const book = await Book.findByIdAndDelete(id)

    if(!book){
        return res.status(400).send({
            message : "Book is not found"
        })
    }    

    return res.status(200).send({
        message: "Book deleted succesfully"
    })    
}

module.exports = {
    newBook,
    allBooks,
    findBook,
    updateBook,
    deleteBook
}
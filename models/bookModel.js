const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    ISBN : {
        type : Number,
        require: true
    },
    publicationDate : {
        type : Date,
        require: true
    }
})

const Book = mongoose.model("book", bookSchema)

module.exports = Book
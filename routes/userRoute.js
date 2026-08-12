const express = require("express")
const { signUp } = require("../controller/userController")


const userRoute = express.Router()

userRoute.post("/signup", signUp)
//userRoute.post("/login", login)

module.exports = userRoute
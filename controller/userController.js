const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = ("jsonwebtoken")

const signUp = async (req,res) =>{
    const {name, email, password, age, city} = req.body

    if(!name || !email || !password || !age){
        return res.status(400).send({
            message: "Invalid Input"
        })
    }

    if(age<13){
        return res.status(400).send({
            message: "You must be 13 or older to use this platform"
        })
    }

    const existingUser = await User.findOne({email: email})

    if(existingUser){
        return res.status(400).send({
            message: "User already exists"
        })
    }

    const encryptPass = await bcrypt.hash(password, 7)

    const user = await User({
        name : name,
        email : email,
        password : encryptPass,
        age : age,
        city : city
    })

    await user.save()

    return res.status(200).send({
        message : "Account created succesfully"
    })
}

module.exports = {
    signUp
}
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

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
        name,
        email,
        password : encryptPass,
        age,
        city
    })

    await user.save()

    return res.status(200).send({
        message : "Account created succesfully"
    })
}

const login = async (req,res)=> {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).send({
            message: "Invalid Input"
        })
    }

    const existingUser = await User.findOne({email: email})

    if(!existingUser){
        res.status(400).send({
            message: "User does not exist"
        })
    }    

    let passwordCheck = await bcrypt.compare(password, existingUser.password)

    if(!passwordCheck){
        return res.status(400).send({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(existingUser.email, process.env.SECRET_KEY)

    return res.status(200).send({
        message : "Login successful",
        token : token
    })

}

module.exports = {
    signUp,
    login
}

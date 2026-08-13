const jwt = require("jsonwebtoken")

const autMiddleware = (req, res) =>{

    const authHeader = req.headers.authorization

    const token = authHeader.split(" ")[1]

    if(!token){
        return res.status(400).send({
            message: "Token is missing"
        })
    }

    const flag = jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = autMiddleware
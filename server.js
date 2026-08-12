const Express = require("express")
const mongoose = require("mongoose")
const dotenv =  require("dotenv")
const dns =  require("dns")
const productRoute = require("./routes/productRoutes")
const userRoute = require("./routes/userRoute")
const app = Express()

app.use(Express.json())

//dns.setServers(["1.1.1.1","8.8.8.8"])
//dotenv.config()

app.use("/api/auth", userRoute)
// app.use()

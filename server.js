const Express = require("express")
const mongoose = require("mongoose")
const dotenv =  require("dotenv")
const dns =  require("dns")
const userRoute = require("./routes/userRoute")
const app = Express()

app.use(Express.json())

dns.setServers(["1.1.1.1","8.8.8.8"])
dotenv.config()

app.use("/api/auth", userRoute)
// app.use()

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected successfully")
    })
}

connectDB()

app.listen(3000, ()=>{
    console.log("Listening to PORT")
})
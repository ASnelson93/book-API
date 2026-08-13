const Express = require("express")
const mongoose = require("mongoose")
const dotenv =  require("dotenv")
const dns =  require("dns")
const userRoute = require("./routes/userRoute")
const bookRoute = require("./routes/bookRoute")
const app = Express()

app.use(Express.json())

dns.setServers(["1.1.1.1","8.8.8.8"])
dotenv.config()

app.use("/api/auth", userRoute)
app.use("/api", bookRoute)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
}

connectDB()

app.listen(3000, ()=>{
    console.log("Listening to PORT")
})

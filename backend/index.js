import express from "express"
import dotenv from "dotenv"
import databaseConnection from "./utils/database.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoutes.js"
import cors from "cors"

dotenv.config({
    path: ".env"
})
const app= express()
databaseConnection()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors())
// api

app.use("/api/v1/user", userRoute)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

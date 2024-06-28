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
const corsOption={
    origin: 'https://netflix-clone-kappa-beryl.vercel.app',
    credentials: true
}

app.use(cors(corsOption))
// api

app.use("/api/v1/user", userRoute)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

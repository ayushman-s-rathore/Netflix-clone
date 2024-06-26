import { User } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path: "../env"
})

export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message: "Invalid emaild or password",
                success: false
            })
        }
        const isMatch = bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message: "Access denied",
                success: false
            })
        }
        const token= await jwt.sign({email},process.env.SECRET_KEY,{expiresIn: "1d"})
        return res.status(200).cookie("token",token, {httpOnly: true }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })

    }catch(error){
        console.log(error)
    }
}
export const Logout= async(req,res)=>{
    return res.status(200).cookie("token","", {expiresIn:new Date(Date.now()), httpOnly: true}).json({
        message: "User LogOut successfully",
        success: true
    })
}
export const Register= async (req,res)=>{
    try{
        const {fullName,email, password}= req.body
        console.log(req.body)
        if(!fullName || !email || !password){
            return res.status(401).json({
                message: "Invalid Data",
                success: false
            })
        }
        const user= await User.findOne({email})
        if(user){
            return res.status(401).json({
                message: "Email already exist",
                success: false
            })
        }
        const hashedPassword= await bcryptjs.hash(password,16)
        await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account created Successfully",
            success: true
        })

    }catch(error){
        console.log(error)
    }

}
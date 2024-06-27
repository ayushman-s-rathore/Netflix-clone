import React, { useState } from 'react'
import Header from './Header'
import net_bg from "../assets/netflix_background.jpg"
import axios from "axios"
import toast from 'react-hot-toast'
import { API_END_POINT } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { setLoading, setUser } from '../redux/userSlice'

const Login = () => {
    const [isLogin, setIsLogin]= useState(false)
    const [email, setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [fullName, setName]=useState("")
    const [cnfPassword, setCnfPassword]= useState("")
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const isLoading = useSelector(store=>store.app.isLoading);

    const loginHandle=()=>{
        setIsLogin(!isLogin)
    }
    const getInputData=async (e)=>{
        e.preventDefault()
        dispatch(setLoading(true));
        if(isLogin){
          const user={fullName,email,password}
          try{
            const res= await axios.post("http://localhost:8080/api/v1/user/register",user,{
              headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
      
            })
            if(res.data.success){
              
              toast.success(res.data.message)
            }
            setIsLogin(false)
          }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
          }finally{
            dispatch(setLoading(false))
          }

        }else{
          dispatch(setLoading(true))
          try{
            const res= await axios.post(`${API_END_POINT}/login`,{email, password},{
              headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
            })
            localStorage.setItem("user",res.data.user)
            dispatch(setUser(res.data.user))
            navigate('/browse')
          }catch(error){
            console.log(error)
          }finally{
            dispatch(setLoading(false));
          }
        }

        setName("")
        setEmail("")
        setPassword("")
        setCnfPassword("")
    }
  return (
    <>
    <div >
       <Header/>
       
        <div className='absolute'>
       <img src={net_bg} className='w-full h-screen'></img>

        </div>
       
       <form onSubmit={getInputData} className='absolute flex flex-col left-0 right-0 w-3/12 p-12 my-36 bg-black mx-auto rounded-md opacity-90 justify-center items-center' >
       <h1 className='text-white text-3xl'>{!isLogin?"Login":"SignUp"}</h1>
        <div className='flex flex-col gap-y-6 mt-4 items-center'>
            { isLogin && 
             <input value={fullName} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Full Name' className='bg-gray-800 rounded-md p-2 mt-2 text-white'/>
             }
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' className='bg-gray-800 rounded-md p-2 mt-2 text-white'></input>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' className='bg-gray-800 rounded-md p-2 mt-2 text-white'></input>
            {isLogin &&
            <>
            <input value={cnfPassword} onChange={(e)=>setCnfPassword(e.target.value)} type='password' placeholder=' Confirm Password' className='bg-gray-800 rounded-md p-2 mt-2 text-white'></input>
             {cnfPassword!==password?<span className='bg-red-200 opacity-90 rounded-md text-white text-xs p-2'>Password Does Not Match</span>:<></> } 
            </>

            }
            <button type='submit' className='bg-red-600 w-24 rounded-md p-2' >Submit</button>
            <p className='text-white'>{!isLogin ? "Want to create account?":"Already have an account?"}<span onClick={loginHandle} className='text-blue-900 cursor-pointer'>{isLogin? " Login":" SignUp"}</span></p>
        </div>
       </form>

    </div>

    </>
  )
}

export default Login
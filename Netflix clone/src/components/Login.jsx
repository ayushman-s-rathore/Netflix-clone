import React, { useState } from 'react'
import Header from './Header'
import net_bg from "../assets/netflix_background.jpg"

const Login = () => {
    const [isLogin, setIsLogin]= useState(true)
    const [email, setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [name, setName]=useState("")

    const loginHandle=()=>{
        setIsLogin(!isLogin)
    }
    const getInputData=(e)=>{
        e.preventDefault()
    }
  return (
    <>
    <div >
       <Header/>
       
        <div className='absolute'>
       <img src={net_bg} className='w-full h-screen'></img>

        </div>
       
       <form onSubmit={getInputData} className='absolute flex flex-col left-0 right-0 w-3/12 p-12 my-36 bg-black mx-auto rounded-md opacity-90 justify-center items-center' >
       <h1 className='text-white text-3xl'>Login</h1>
        <div className='flex flex-col gap-y-6 mt-4 items-center'>
            { isLogin && 
             <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='First Name' className='bg-gray-800 rounded-md p-2 mt-2 text-white'/>
             }
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='Email' className='bg-gray-800 rounded-md p-2 mt-2 text-white'></input>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='text' placeholder='Password' className='bg-gray-800 rounded-md p-2 mt-2 text-white'></input>
            <button type='submit' className='bg-red-600 w-24 rounded-md p-2' >Submit</button>
            <p className='text-white'>{isLogin ? "Want to create account?":"Already have an account?"}<span onClick={loginHandle} className='text-blue-900 cursor-pointer'>{isLogin? " Login":" SignUp"}</span></p>
        </div>
       </form>

    </div>

    </>
  )
}

export default Login
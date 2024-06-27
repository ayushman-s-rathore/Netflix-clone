import React from 'react'

import  netflix_logo  from "../assets/netflix_logo.png"

import {useSelector,useDispatch} from "react-redux" 
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
  const user= useSelector((store)=>store.app.user)
  const toggle = useSelector(store=>store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  // console.log(user)
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${API_END_POINT}/logout`,{
           withCredentials:true

      });
        if(res.data.success){
            toast.success(res.data.message);
        }
        localStorage.removeItem("user")
        dispatch(setUser(null));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}
const toggleHandler = () => {
  dispatch(setToggle());
}
console.log(user)
  return (
    <div className='absolute z-10 w-full flex flex-row bg-gradient-to-b from-black justify-between overflow-x-hidden'>
       <img src={netflix_logo} className='w-26 h-20'></img>
       {user&&
       <div className='flex flex-row gap-x-6 h-20 items-center'>
        <h1 className='text-white'>{user.fullName}</h1>
        <button className='mr-2 bg-red-600 px-4 py-2 rounded-md text-gray-50' onClick={logoutHandler}> Logout</button>
        <button onClick={toggleHandler} className='mr-6 bg-red-600 px-4 py-2 rounded-md text-gray-50'>{toggle ? "Home" : "Search Movie"}</button>
      
       </div>

       }
    </div>
  )
}

export default Header
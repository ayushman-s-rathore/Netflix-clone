import React from 'react'
import {useSelector} from 'react-redux'
import  netflix_logo  from "../assets/netflix_logo.png"
const Header = () => {
  const user= useSelector((store)=>store.app.user)
  // console.log(user)
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${API_END_POINT}/logout`);
        if(res.data.success){
            toast.success(res.data.message);
        }
        dispatch(setUser(null));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div className='absolute z-10 w-full flex flex-row bg-gradient-to-b from-black justify-between overflow-x-hidden'>
       <img src={netflix_logo} className='w-26 h-20'></img>
       {user&&
       <div className='flex flex-row gap-x-6 h-20 items-center'>
        <h1 className='text-white'>{user.fullName}</h1>
        <button className='mr-2 bg-red-600 px-4 py-2 rounded-md text-gray-50' onClick={logoutHandler}> Logout</button>
        <button className='mr-6 bg-red-600 px-4 py-2 rounded-md text-gray-50'>Search</button>
      
       </div>

       }
    </div>
  )
}

export default Header
import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from './MainContainer';

const Browse = () => {
  const user = useSelector(store=>store.app.user)
  const navigate= useNavigate()

  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  },[])
  return (
    <>
    <Header/>
    </>
  )
}

export default Browse
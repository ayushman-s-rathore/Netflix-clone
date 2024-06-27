import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import MovieInfo from './MovieInfo'


const Body = () => {


  
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/browse' element={<Browse/>}/>
         <Route path='/movie/:movieId' element={<MovieInfo/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default Body
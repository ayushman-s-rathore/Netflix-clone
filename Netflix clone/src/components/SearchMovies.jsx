import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SEARCH_MOVIE_URL, options } from '../utils/constant'
import {useDispatch, useSelector} from 'react-redux'
import { setSearchMovieDetails } from '../redux/searchSlice'
import { setLoading } from '../redux/userSlice'
import MovieList from './MovieList'


const SearchMovies = () => {
  const [searchMovie, setSearchMovie]= useState("")
  const dispatch= useDispatch()
  const isLoading= useSelector(store=>store.app.isLoading)
  const {movieName, searchedMovie}= useSelector(store=>store.searchMovie)
  const getMovies= async()=>{
    dispatch(setLoading(true))
    try{
      const res= await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,options)
      const movies= res?.data?.results
      
      dispatch(setSearchMovieDetails({searchMovie,movies}))
    }catch(error){
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
    // setSearchMovie("")
  }
  useEffect(()=>{
    getMovies()
    
  },[searchMovie])
  return (
    <>
      <div className='flex flex-col bg-stone-900 h-screen'>
        <div className='flex flex-row mt-36 mx-auto border w-1/2 p-2 rounded-lg'>
        <input value={searchMovie} placeholder='Search Movies' type='text' className='text-xl w-full bg-transparent text-white focus:border-transparent focus:outline-none' onChange={(e)=>setSearchMovie(e.target.value)} ></input> 
        </div>

      {
        searchedMovie ? <MovieList title={movieName} searchMovie={false} movies={searchedMovie}/>:<h1>No Such Movie found</h1>
      }
      </div>
    </>
  )
}

export default SearchMovies
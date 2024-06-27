import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { SEARCH_MOVIE_URL, TMDB_IMG_URL, options } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
import { getId, setOpen } from '../redux/movieSlice'

const MovieInfo = () => {
    const movieId= useSelector(store=>store.movie.id)
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const [info, setInfo]= useState("")
    console.log(movieId)
    const getMovie=async ()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,options)
        setInfo(res.data)
        console.log(info)
    }
    useEffect(()=>{
        getMovie()
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getId(movieId));
        dispatch(setOpen(true));
    }
  return (
    <>
    <div className='flex h-screen bg-stone-900 w-full justify-center items-start'>
        <div className='flex flex-col justify-center items-center w-1/2 my-auto'>
            <img src={`${TMDB_IMG_URL}/${info.poster_path}`} alt={info.title} className=' h-96'></img>
            <h1 className='text-3xl text-white mt-2'>{info.title}</h1>
            <p className='text-l text-white pt-2 text-center'>{info.overview}</p>
            <p className='text-l text-white pt-2 text-center flex flex-row'>Genre:
                {
                  (info && info.genres) &&  info.genres.map((genre)=>(<p className='text-l text-white mx-1'>{genre.name}</p>))
                }
            </p>

        <div className='felx flex-row mt-6 '>
            <button onClick={()=>navigate('/browse')} className='bg-red-800 text-white px-4 py-1 mr-4 text-xl rounded-md'>Back</button>
            <button onClick={handleSubmit} className='bg-red-800 text-white px-4 py-1 mr-4 text-xl rounded-md'>Watch Trailer</button>
        </div>
        </div>

    </div>
    </>
  )
}

export default MovieInfo
import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ posterPath,movieId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  if (posterPath === null) return null;

  // console.log(localStorage)

  const handleOpen = () => {
    
    dispatch(getId(movieId));
    dispatch(setOpen(false));
    navigate(`/browse/${movieId}`)
  }

  return (
    <div className='w-48 pr-4 hover:scale-105 transition' onClick={handleOpen}>
      <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="movie-banner" />
    </div>
  )
}

export default MovieCard;
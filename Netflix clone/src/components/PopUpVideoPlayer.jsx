import React from 'react'
import useMovieById from '../hooks/useMovieById';
import {useSelector} from "react-redux";

const PopUpVideoPlayer = ({movieId}) => {
    const trailerMovie = useSelector(store=>store.movie.popUpMovie);
    
    useMovieById(movieId);

    return (
        <div className='w-auto overflow-hidden'>
            <iframe
                className="w-full aspect-video" 
                src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default PopUpVideoPlayer
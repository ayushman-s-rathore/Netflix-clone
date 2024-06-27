import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies,searchMovie=false }) => {

    return (
        <div className='px-8'>
            <h1 className="text-white text-3xl py-3 ">{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar cursor-pointer '>
                <div className={`${searchMovie?"flex flex-row flex-wrap":"flex items-center"}`}>
                    {
                       movies?.map((movie) => { 
                            
                            return (
                                <MovieCard key={movie.id} movieId = {movie.id} posterPath={movie.poster_path} />
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default MovieList
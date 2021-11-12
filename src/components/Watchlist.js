import React from 'react'

const Watchlist = ({watchlist, setwatchlist}) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
    return (
        <div className="flex flex-row flex-wrap justify-center mt-20">
            {watchlist.map((movie) => {return (
              <a
                href={`/movie/${movie.id}`}
                className="m-4 w-36 lg:w-56 shadow-2xl rounded transform hover:scale-105  transition-all duration-500"
                key={movie.id}
              >
                <img
                  src={IMAGE_BASE_URL + movie.poster_path}
                  className="rounded"
                  alt={movie.title}
                ></img>
              </a>
            );})}
        </div>
    )
}

export default Watchlist


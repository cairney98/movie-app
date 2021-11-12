import {React, useEffect} from "react";

const Watchlist = ({ watchlist, setWatchlist }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

 useEffect(() => {
   localStorage.setItem("watchlist", JSON.stringify(watchlist));
 }, [watchlist]);

 if (watchlist.length === 0) {
     return (
       <h1 className="text-gray-400 text-center pt-5 tracking-wide mt-20">
         Your watchlist is empty.
       </h1>
     );
 }

  return (
    <div className="flex flex-row flex-wrap justify-center mt-20">
      {watchlist.map((movie) => {
        return (
          <div
            key={movie.id}
            className="m-4 w-36 lg:w-56 flex flex-col rounded "
          >
            <a
              className="transform hover:scale-105  transition-all duration-500"
              href={`/movie/${movie.id}`}
            >
              <img
                src={IMAGE_BASE_URL + movie.poster_path}
                className="rounded poster duration-500"
                alt={movie.title}
              ></img>
            </a>
            <button 
            onClick = {() => setWatchlist(watchlist.filter(item => item.id !== movie.id))}
            className="text-4xl text-red-900 hover:text-gray-100 duration-100 rounded-full self-center p-1 px-2.5 mt-2">
              <i class="far fa-times-circle"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Watchlist;

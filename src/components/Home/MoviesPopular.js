import React from "react";

const MoviesPopular = ({ movieList, loading }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  if (loading) {
    return (
      <h2 className="text-gray-400 text-3xl absolute left-1/2 top-1/2">
        Loading...
      </h2>
    );
  }

  return (
    <section className="mt-20 ">
      <h1 className="text-gray-400 text-3xl ml-8 mb-4">Trending Movies</h1>
      <div className="grid grid-flow-col mx-2 sc1 auto-cols-max overflow-x-auto justify-left box-border bg-gray-900 bg-opacity-50 rounded-2xl ">
        {movieList.map((movie) => {
          if (movie.poster_path) {
            return (
              <a href={`movie/${movie.id}`} className="m-4">
                <img
                  src={IMAGE_BASE_URL + movie.poster_path}
                  className="w-48 md:w-64 shadow-2xl rounded transform hover:scale-105 transition-all duration-500 "
                  alt={movie.title}
                  key={movie.id}
                ></img>
              </a>
            );
          }
        })}
      </div>
    </section>
  );
};

export default MoviesPopular;

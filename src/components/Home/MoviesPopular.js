import { React, useRef } from "react";

const MoviesPopular = ({ movieList, loading }) => {
  const ref = useRef(null);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

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
      <nav className="flex flex-row flex-nowrap items-center">
        <button
          className="text-gray-400 text-2xl bg-gray-400 bg-opacity-10 hover:bg-opacity-40 duration-200 px-3 transform z-40 rounded-l-lg h-32"
          onClick={() => scroll(-574)}
        >
          L
        </button>

        <div
          ref={ref}
          className="grid grid-flow-col w-full  sc1 auto-cols-max overflow-x-auto justify-left box-border bg-gray-900 bg-opacity-50 rounded-2xl pr-2"
        >
          {movieList
            .filter((movie) => movie.poster_path)
            .map((movie) => {
              return (
                <a href={`movie/${movie.id}`} key={movie.id} className="m-4">
                  <img
                    src={IMAGE_BASE_URL + movie.poster_path}
                    className="w-48 md:w-64 shadow-2xl rounded transform hover:scale-105 transition-all duration-500 "
                    alt={movie.title}
                    key={movie.id}
                  ></img>
                </a>
              );
            })}
        </div>
        <button
          className="text-gray-400 text-2xl h-32 bg-gray-400 bg-opacity-10 hover:bg-opacity-40 duration-200 px-3 transform -translate-x-0 rounded-r-lg  "
          onClick={() => scroll(574)}
        >
          R
        </button>
      </nav>
    </section>
  );
};

export default MoviesPopular;

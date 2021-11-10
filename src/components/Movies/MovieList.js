import { React, useEffect, useState } from "react";
import { getDiscoverRequest } from "../../API";
import SortBy from "./SortBy";
import YearRange from "./YearRange";
import Starring from "./Starring";

const MovieList = () => {
  const [loading, setloading] = useState(false);
  const [movies, setMovies] = useState({
    results: [],
    total_pages: "",
  });
  const [filter, setFilter] = useState({
    sortby: "primary_release_date",
    direction: "desc",
    minyear: "1950",
    maxyear: "2021",
    featuring: "",
    page: 1,
  });
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const getDiscoverMovies = async () => {
    setloading(true);
    const response = await getDiscoverRequest(
      filter.page,
      filter.sortby,
      filter.direction,
      filter.minyear,
      filter.maxyear,
      filter.featuring,
      75,
      "",
      "",
      "",
      ""
    );
    setloading(false);
    setMovies((prev) => {
      return filter.page > 1
        ? { ...prev, results: prev.results.concat(response.results) }
        : {
            ...prev,
            results: response.results,
            total_pages: response.total_pages,
          };
    });
  };

  useEffect(() => {
    getDiscoverMovies();
  }, [filter]);

  return (
    <main className="flex flex-col flex-wrap justify-center items-center">
      {/* FILTERS */}
      <header className="flex sm:flex-row flex-col  mt-24 mb-6 border-2 p-4 py-6 gap-8 bg-gray-900 bg-opacity-30 rounded-lg border-gray-300">
        <SortBy setFilter={setFilter} />
        <YearRange setFilter={setFilter} />
        <Starring setFilter={setFilter} />
      </header>

      {/* MOVIES */}
      <section className="flex flex-wrap justify-center box-border ">
        {movies.results.map((movie) => {
          return (
            <a
              href={`/movie/${movie.id}`}
              className="m-4 w-32 lg:w-56 shadow-2xl rounded transform hover:scale-105  transition-all duration-500"
              key={movie.id}
            >
              <img
                src={IMAGE_BASE_URL + movie.poster_path}
                className="rounded"
                alt={movie.title}
              ></img>
            </a>
          );
        })}
      </section>

      {/* LOAD MORE */}
      <section className="flex flex-row justify-center box-border my-10 gap-1">
        <button
          onClick={() =>
            setFilter((previousState) => {
              return {
                ...previousState,
                page: parseFloat(previousState.page) + parseFloat(1),
              };
            })
          }
          className={
            movies.total_pages > 1
              ? `bg-gray-900 text-gray-400 rounded p-4 hover:bg-gray-300 font-medium hover:text-gray-900 duration-300`
              : `hidden`
          }
        >
          LOAD MORE
        </button>
      </section>
    </main>
  );
};

export default MovieList;

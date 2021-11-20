import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieRequest } from "../../API";
import MovieCredits from "./MovieCredits";

const Movie = ({ setWatchlist, watchlist }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieCredits, setMovieCredits] = useState({
    cast: [],
    crew: [],
    loadMore: false,
  });
  const { movieId } = useParams();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
  let storedMovie = watchlist.some((item) => item.id === movieDetails.id);

  const getMovieDetails = async () => {
    const detailResponse = await getMovieRequest(movieId);
    setMovieDetails(detailResponse);
  };
  const getMovieCredits = async () => {
    const creditResponse = await getMovieRequest(movieId, "/credits");
    setMovieCredits((prev) => {
      return movieCredits.loadMore
        ? { ...prev, cast: creditResponse.cast }
        : {
            ...prev,
            cast: creditResponse.cast.slice(0, 12),
            crew: creditResponse.crew,
          };
    });
  };

  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
  }, [movieCredits]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="flex flex-col ">
      {/* BACKGROUND */}
      <img
        className="filter contrast-100 brightness-50  w-full opacity-100 fixed top-40 md:top-0"
        src={IMAGE_BASE_URL + movieDetails.backdrop_path}
        alt=""
      />

      {/* MOVIE DETAILS */}
      <header className="flex flex-row items-center flex-wrap md:flex-nowrap justify-evenly md:mx-16 mb-24 mt-32 bg-black bg-opacity-60 z-40">
        <img
          className="w-72"
          src={IMAGE_BASE_URL + movieDetails.poster_path}
          alt={movieDetails.title}
        />
        <article className="flex flex-col m-4 text-left tracking-wide gap-1">
          <button
            onClick={() =>
              setWatchlist(
                storedMovie
                  ? watchlist.filter((item) => item.id !== movieDetails.id)
                  : (prev) => {
                      return [...prev, movieDetails];
                    }
              )
            }
            className={
              storedMovie
                ? `text-white bg-gradient-to-r from-red-900  to-red-700 filter brightness-90 hover:brightness-110 hover:shadow-xl  tracking-wide rounded-full p-1 px-2.5 self-start duration-200`
                : `text-white bg-gradient-to-r from-green-600  to-blue-600 filter brightness-90 hover:brightness-125 hover:shadow-xl  tracking-wide rounded-full p-1 px-2.5 self-start duration-200`
            }
          >
            {storedMovie ? (
              <p>
                <i class="fas fa-times"></i> Remove from Watchlist
              </p>
            ) : (
              <p>
                <i class="fas fa-plus"></i> Add to Watchlist
              </p>
            )}
          </button>
          <h1 className="text-white text-5xl py-2">{movieDetails.title} </h1>
          <h3 className="text-white ">
            <em>{movieDetails.tagline}</em>
          </h3>
          <p className="text-white pb-5 ">{movieDetails.overview}</p>

          <div className="grid grid-rows-2 grid-cols-2 gap-4 tracking-wider">
            <p className="text-white flex flex-col ">
              <strong> Directed by:</strong>
              {movieCredits.crew
                .filter((person) => person.job === "Director")
                .map((person) => {
                  return <a href={`/people/${person.id}`}>{person.name} </a>;
                })}
            </p>
            <p className="text-white  ">
              <strong>Release:</strong> <br /> {movieDetails.release_date}
            </p>
            <p className="text-white  ">
              <strong> Vote Average:</strong> <br /> {movieDetails.vote_average}
              /10
            </p>
            <p className="text-white  ">
              <strong> Revenue:</strong> <br /> ${movieDetails.revenue}
            </p>
          </div>
        </article>
      </header>

      <MovieCredits
        movieCredits={movieCredits}
        setMovieCredits={setMovieCredits}
      />

      <section className="flex flex-row justify-center box-border  mb-10 gap-1 z-50">
        <button
          onClick={() =>
            setMovieCredits((previousState) => {
              return {
                ...previousState,
                loadMore: true,
              };
            })
          }
          className={
            movieCredits.loadMore || movieCredits.cast.length < 12
              ? `hidden`
              : `tracking-wide bg-gray-900 text-gray-400 rounded p-4 px-12 hover:bg-gray-300 font-medium hover:text-gray-900 duration-300`
          }
        >
          SEE ALL
        </button>
      </section>
    </div>
  );
};

export default Movie;

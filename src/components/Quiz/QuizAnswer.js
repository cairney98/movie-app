import {React, useState, useEffect} from 'react'
import { getMovieRequest } from '../../API';
import { useParams } from 'react-router';

const QuizAnswer = () => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [movie, setMovie] = useState([])
    const { answer } = useParams();
    const { input } = useParams();

    const getMovieDetails = async () => {
      const response = await getMovieRequest(answer);
      setMovie(response);
    };


    useEffect(() => {
        getMovieDetails();
    }, [])


    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-gray-400 tracking-wide text-2xl mt-16 mb-4">
          {input === movie.title ? (
            <strong className="text-green-500">Correct! </strong>
          ) : movie.id === 121 ? (
            input.includes("Lord of the Rings") ? (
              <strong className="text-green-500">Correct! </strong>
            ) : (
              <strong className="text-red-500">Incorrect. </strong>
            )
          ) : (
            <strong className="text-red-500">Incorrect. </strong>
          )}
          The answer was...
        </h1>
        <a
          href={`/movie/${movie.id}`}
          className="flex flex-wrap flex-col justify-center  mb-5 transform hover:scale-105 transition-all duration-500"
        >
          <img
            className="w-48 md:w-64 shadow-2xl rounded  "
            src={IMAGE_BASE_URL + movie.poster_path}
            alt={movie.title}
          ></img>
          <div className="p-3 w-48 md:w-64 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
            <strong> {movie.title} </strong>
          </div>
        </a>
        <a
          className="bg-gray-900 text-gray-400 rounded p-2 hover:bg-gray-300 font-medium hover:text-gray-900 duration-300"
          href="/quiz"
        >
          Another?
        </a>
      </div>
    );
}

export default QuizAnswer

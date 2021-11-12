import { React, useState, useEffect } from "react";
import {
  getDiscoverRequest,
  getMovieRequest,
  getSearchRequest,
} from "../../API";

const QuizPage = () => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [answerPrompt, setAnswerPrompt] = useState({ results: [] });
  const [question, setQuestion] = useState({
    person1: "",
    person2: "",
    answer: "",
  });

  const getAnswerPrompt = async () => {
    const response = await getSearchRequest(inputText, "movie");
    setAnswerPrompt(response);
  };
  useEffect(() => {
    getAnswerPrompt();
  }, [inputText]);

  const getMovies = async () => {
    setLoading(true);
    const response = [];
    for (let i = 1; i < 4; i++) {
      response.push(
        await getDiscoverRequest(
          `${i}`,
          "vote_average",
          "desc",
          "1975",
          "2021",
          "",
          "5000",
          "&vote_average.gte=8",
          "&with_original_language=en",
          "&without_genres=16",
          "&without_keywords=177912&without_keywords=180547"
        )
      );
    }
    const randomNumber = (n) => {
      return Math.floor(Math.random() * n);
    };

    const randomMovie = response[randomNumber(3)].results[randomNumber(20)];
    const randomMovieCredits = await getMovieRequest(
      randomMovie.id,
      "/credits"
    );

    const castIndex = randomNumber(1);
    setQuestion({
      person1: randomMovieCredits.cast[castIndex],
      person2: randomMovieCredits.cast[castIndex + 1],
      answer: randomMovie,
    });
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputText) {
      window.location.href = `/quizanswer/${question.answer.id}/${inputText}`;
    }
  };

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };
  console.log(question);

  if (loading) {
    return (
      <h1 className="text-gray-400 text-3xl absolute left-1/2 top-1/2 transform -translate-x-1/2">
        Loading...
      </h1>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-400 tracking-wide text-2xl mt-20">
          Name the film starring...
        </h1>
        <header className="flex md:flex-row flex-col justify-center items-center gap-4 my-4">
          <div className="flex flex-wrap flex-col justify-center">
            <img
              className="w-40 md:w-56 shadow-2xl rounded"
              src={IMAGE_BASE_URL + question.person1.profile_path}
              alt={question.person1.name}
            ></img>
            <div className="p-3 w-40 md:w-56 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
              <strong> {question.person1.name} </strong>
            </div>
          </div>
          <p className="text-gray-400">+</p>
          <div className="flex flex-wrap flex-col justify-center">
            <img
              className="w-40 md:w-56 shadow-2xl rounded"
              src={IMAGE_BASE_URL + question.person2.profile_path}
              alt={question.person2.name}
            ></img>
            <div className="p-3 w-40 md:w-56 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
              <strong> {question.person2.name} </strong>
            </div>
          </div>
        </header>

        <form
          className="flex flex-row flex-wrap gap-1 justify-center mb-10"
          autoComplete="off"
        >
          <label
            className="text-gray-400 px-2 self-center font-semibold"
            htmlFor="answer"
          >
            Answer:
          </label>
          <input
            onChange={inputHandler}
            className="rounded bg-gray-900 -py-1 text-gray-400  "
            list="answer"
            id="answerbox"
          />
          <datalist id="answer">
            {answerPrompt.results
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 3)
              .map((movie) => {
                return (
                  <option
                    className={
                      inputText ? `bg-gray-200 text-gray-800` : `hidden`
                    }
                    value={movie.title}
                    key={movie.id}
                  ></option>
                );
              })}
          </datalist>
          <button
            className={
              inputText
                ? `bg-blue-800 rounded  active:bg-red-800 text-gray-300 p-1 hover:bg-gray-200 hover:text-gray-700 duration-100`
                : `bg-blue-800 rounded  active:bg-red-800 text-gray-300 p-1 opacity-30 pointer-events-none`
            }
            onClick={submitHandler}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default QuizPage;

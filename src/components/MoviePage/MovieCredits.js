import { React } from "react";

const MovieCredits = ({ movieCredits }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      <div className=" z-50 text-4xl text-white opacity-100 pl-20 font-extralight pt-4 tracking-wide">
        <h1>Cast</h1>
      </div>

      <section className="flex flex-row justify-center  flex-wrap gap-4 pt-6">
        {movieCredits.cast
          .filter((person) => person.cast_id && person.profile_path)
          .map((person) => {
            return (
              <a
                className="flex flex-wrap flex-col justify-center transform hover:scale-105 transition-all  duration-500 "
                href={`/people/${person.id}`}
                key={person.id}
              >
                <img
                  className=" w-44 sm:w-48 rounded-t-3xl "
                  src={IMAGE_BASE_URL + person.profile_path}
                  alt=""
                />
                <caption className="p-3 w-44 sm:w-48 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
                  <strong> {person.name} </strong> <br /> {person.character}
                </caption>

                <br />
              </a>
            );
          })}
      </section>
    </div>
  );
};

export default MovieCredits;

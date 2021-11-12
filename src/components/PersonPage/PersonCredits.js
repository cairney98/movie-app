import React from 'react'

const PersonCredits = ({personCredits, jobFilter, setJobFilter}) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/h632/";

    const jobs = personCredits
      .filter((item) => item.poster_path)
      .map((item) => (item.job ? item.job : "Acting"));
    const uniqueJobs = [...new Set(jobs)].sort();

    const filterHandler = (e) => {
      setJobFilter(e.target.value);
    };

    return (
      <div className=" flex flex-col justify-center items-center text-gray-400">
        <select
          className="w-32 rounded bg-gray-900 mt-12"
          onInput={filterHandler}
        >
          <option value="All">All</option>
          {uniqueJobs.map((job) => {
            return <option value={`${job}`}>{`${job}`}</option>;
          })}
        </select>

        <section className="flex flex-row justify-center flex-wrap gap-10 pt-6">
          {personCredits

            .filter((item, index, self) =>
              jobFilter === "All"
                ? self.findIndex((a) => a.title === item.title) === index
                : jobFilter === "Acting"
                ? item.character
                : item.job === jobFilter
            )
            .sort(
              (a, b) => parseFloat(b.release_date) - parseFloat(a.release_date)
            )

            .map((item) => {
              if (item.poster_path) {
                return (
                  <a
                    className="flex flex-wrap flex-col justify-center transform hover:scale-105 group  transition-all duration-500 "
                    href={`/movie/${item.id}`}
                  >
                    <img
                      className=" w-32 sm:w-48 rounded "
                      src={IMAGE_BASE_URL + item.poster_path}
                      alt=""
                    />

                    <caption className="p-3 w-32 sm:w-48 text-center  text-gray-400 tracking-wide truncate duration-300 rounded-b bg-gray-900">
                      <strong>{item.title}</strong> <br />
                      {item.release_date
                        ? item.release_date.substr(0, 4)
                        : ""}{" "}
                      <br />
                      {item.character ? item.character : item.job}
                    </caption>
                  </a>
                );
              }
            })}
        </section>
      </div>
    );
}

export default PersonCredits

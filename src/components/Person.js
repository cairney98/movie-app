import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPersonRequest } from "../API";

const Person = () => {
  const [personDetails, setPersonDetails] = useState({});
  const [personImages, setPersonImages] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);
  const [jobFilter, setJobFilter] = useState("All");

  const { personId } = useParams();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/h632/";

  const getPersonDetails = async (personId) => {
    const personResponse = await getPersonRequest(personId);
    setPersonDetails(personResponse);
  };
  const getPersonImages = async (personId) => {
    const imagesResponse = await getPersonRequest(personId, "/images");
    setPersonImages(imagesResponse.profiles);
  };
  const getPersonCredits = async (personId) => {
    const creditsResponse = await getPersonRequest(personId, "/credits");
    setPersonCredits(creditsResponse.crew.concat(creditsResponse.cast));
  };

  useEffect(() => {
    getPersonDetails(personId);
    getPersonImages(personId);
    getPersonCredits(personId);
  }, [personId]);

  const jobs = personCredits
    .filter((item) => item.poster_path)
    .map((item) => (item.job ? item.job : "Acting"));
  const uniqueJobs = [...new Set(jobs)].sort();

  const filterHandler = (e) => {
    setJobFilter(e.target.value);
  };

  console.log(
    personCredits.filter(
      (item, index, self) =>
        self.findIndex((a) => a.title === item.title) === index
    )
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="flex flex-col md:flex-row items-center md:justify-center container pt-20 px-12 ">
        <img
          className="w-80 rounded-md border-2 border-gray-800"
          src={IMAGE_BASE_URL + personDetails.profile_path}
          alt={personDetails.name}
        />
        <article className="flex flex-col flex-wrap m-4 w-3/4 text-left ">
          <h1 className="text-white text-5xl pb-2">{personDetails.name}</h1>
          <p className="text-white whitespace-pre-line max-h-64  overflow-auto sc1 bg-gray-900 rounded p-3">
            {personDetails.biography}
          </p>
          <p className="text-white pt-6 "> </p>

          {/* IMAGES */}

          <div className="flex flex-row mx-2 sc1 p-2 rounded overflow-x-auto justify-left box-border bg-gray-900 bg-opacity-50  ">
            {personImages.slice(1, 100).map((image) => {
              return (
                <img
                  className="w-32"
                  src={IMAGE_BASE_URL + image.file_path}
                  alt=""
                />
              );
            })}
          </div>
        </article>
      </header>

      {/* CREDITS */}
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
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
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
                      <strong>{item.title}</strong>  <br />
                      {item.character ? item.character : item.job} 
                    </caption>
                  </a>
                );
              }
            })}
        </section>
      </div>
    </main>
  );
};

export default Person;

import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSearchRequest } from "./API";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchterm } = useParams();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const getSearchResults = async () => {
    const people = await getSearchRequest(searchterm, "person");
    const movies = await getSearchRequest(searchterm, "movie");
    setSearchResults(people.results.concat(movies.results));
  };
  console.log(searchResults);

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <main className="flex flex-col justify-center box-border pt-16">
      <h1 className="text-gray-400 text-center pt-5 tracking-wide">
        Showing search results for "{searchterm}".
      </h1>
      <section className="flex flex-wrap justify-center box-border mt-3 px-0">
        {searchResults
          .filter((item) => item.poster_path || item.profile_path)
          .sort((a, b) => b.popularity - a.popularity)
          .map((item) => {
            return (
              <a
                href={item.gender ? `/people/${item.id}` : `/movie/${item.id}`}
                className="m-4 w-48 shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <img
                  src={
                    IMAGE_BASE_URL +
                    (item.poster_path ? item.poster_path : item.profile_path)
                  }
                  className=" rounded-t"
                  alt={item.name}
                  key={item.id}
                ></img>
                <caption className="p-3 w-48 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
                  <strong>
                    {item.name} {item.title}
                  </strong>
                  <br />
                  {item.known_for
                    ? item.known_for
                        .map((a) => (a.title ? a.title : a.name))
                        .join(", ")
                    : item.release_date
                    ? item.release_date.substr(0, 4)
                    : item.first_air_date
                    ? item.first_air_date.substr(0, 4)
                    : ""}
                </caption>
              </a>
            );
          })}
      </section>
    </main>
  );
};

export default SearchPage;

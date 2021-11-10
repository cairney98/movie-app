import { React, useState, useEffect } from "react";
import { getSearchRequest } from "../../API";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [searchPrompt, setSearchPrompt] = useState([]);

  const getSearchPrompt = async (inputText) => {
    const movies = await getSearchRequest(inputText, "movie");
    const people = await getSearchRequest(inputText, "person");
    setSearchPrompt(movies.results.concat(people.results));
  };
  useEffect(() => {
    getSearchPrompt(inputText);
  }, [inputText]);

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location.pathname = `/search/${inputText}`;
    }
  };

  return (
    <form className="group flex pr-8" autoComplete="off">
      <input
        onChange={inputHandler}
        className="pl-3 group-hover:bg-opacity-100 duration-300 border-l-2 border-t-2 border-b-2 border-gray-400 text-white bg-gray-800 bg-opacity-50 rounded-l-full focus:outline-none text-md"
        list="search"
        id="searchbar"
        onKeyDown={enterHandler}
      />
      <datalist id="search">
        {searchPrompt
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6)
          .map((item) => {
            return (
              <option
                className={inputText ? `bg-gray-200 text-gray-800` : `hidden`}
                value={item.name || item.title}
                key={item.id}
              >
                {item.known_for_department}
              </option>
            );
          })}
      </datalist>
      <a
        
        className="group-hover:bg-opacity-100  border-r-2 border-t-2 border-b-2 border-gray-400 text-gray-400 rounded-r-full pr-2 bg-gray-800 bg-opacity-50 "
        href={`/search/${inputText}`}
      >
        <i className=" fas fa-search transform hover:scale-110 duration-200"></i>
      </a>
    </form>
  );
};

export default SearchBar;

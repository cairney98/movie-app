import { React, useState, useEffect } from "react";
import { getSearchRequest } from "../../API";

const Starring = ({ setFilter }) => {
  const [inputText, setInputText] = useState("");
  const [starringPrompt, setStarringPrompt] = useState({ results: [] });

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const getStarringPrompt = async () => {
    const response = await getSearchRequest(inputText, "person");
    setStarringPrompt(response);
  };
  useEffect(() => {
    getStarringPrompt();
  }, [inputText]);

  const filterHandler = (e) => {
    e.preventDefault();
    setFilter((previousState) => {
      return {
        ...previousState,
        featuring:
          inputText === "" ? "" : "&with_cast=" + starringPrompt.results[0].id,
        page: 1,
      };
    });
  };

  return (
    <form className="flex flex-col text-gray-400" autoComplete="off">
      <label htmlFor="starring"> Featuring:</label>
      <div className="flex flex-row">
        <input
          onChange={inputHandler}
          className="h-7 p-1 rounded bg-gray-900 "
          list="people"
          id="starring"
        />
        <button
          className="bg-blue-900 rounded px-1 active:bg-red-900"
          onClick={filterHandler}
        >
          Go
        </button>
      </div>
      <datalist id="people">
        {starringPrompt.results
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6)
          .map((person) => {
            return (
              <option
                className={inputText ? `bg-gray-200 text-gray-800` : `hidden`}
                value={person.name}
                key={person.id}
              >
                {person.known_for_department}
              </option>
            );
          })}
      </datalist>
    </form>
  );
};

export default Starring;

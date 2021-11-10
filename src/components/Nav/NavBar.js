import { React } from "react";
import NavButton from "./NavButton";
import SearchBar from "./SearchBar";

const Nav = () => {
  const linkHandler = () => {
    window.open("https://www.themoviedb.org/documentation/api", "_blank");
  };
  return (
    <div className="whitespace-nowrap	flex sc2 overflow-x-auto fixed top-0 right-0 left-0 lg:justify-center  mx-2 sm:mx-24 -mt-2 py-4 pt-6 rounded-b-2xl bg-gray-900 bg-opacity-60 z-50 shadow-xl">
      <img
        onClick={linkHandler}
        className="h-8 pl-8 cursor-pointer"
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        alt="The Movie Data Base Logo"
      />
      <ul className="px-12">
        {/* <a
          className={`w-64 px-7 rounded hover:bg-blue-500 mx-0.5 py-2 opacity-70 tracking-wider bg-gray-900 text-gray-400 hover:text-gray-100 hover:opacity-100 transition-all hover:py-3 duration-300`}
          href={`/`}
        >
         HOME
        </a> */}
        <NavButton colour="blue" tag="HOME" path="/" paddingx="7" />
        {/* <a
          className={`w-64 px-6 rounded hover:bg-red-500 mx-0.5 py-2 opacity-70 tracking-wider bg-gray-900 text-gray-400 hover:text-gray-100 hover:opacity-100 transition-all hover:py-3 duration-300`}
          href={`/movies`}
        >
          MOVIES
        </a> */}
        <NavButton colour="red" tag="MOVIES" path="/movies" paddingx="6" />
        {/* <a
          className={`w-64 px-4 rounded hover:bg-green-500 mx-0.5 py-2 opacity-70 tracking-wider bg-gray-900 text-gray-400 hover:text-gray-100 hover:opacity-100 transition-all hover:py-3 duration-300`}
          href={`/watchlist`}
        >
          WATCHLIST
        </a> */}
        <NavButton
          colour="green"
          tag="WATCHLIST"
          path="/watchlist"
          paddingx="4"
        />
        {/* <a
          className={`w-64 px-8 rounded hover:bg-purple-500 mx-0.5 py-2 opacity-70 tracking-wider bg-gray-900 text-gray-400 hover:text-gray-100 hover:opacity-100 transition-all hover:py-3 duration-300`}
          href={`/quiz`}
        >
          QUIZ
        </a> */}
        <NavButton colour="purple" tag="QUIZ" path="/quiz" paddingx="8" />
      </ul>

      <SearchBar />
    </div>
  );
};

export default Nav;

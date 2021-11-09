import { React } from "react";
import NavButton from "./NavButton";
import SearchBar from "./SearchBar";

const Nav = ({ setSearchTerm }) => {
  const linkHandler = () => {
    window.open("https://www.themoviedb.org/documentation/api", "_blank");
  };
  return (
    <div className="whitespace-nowrap	flex sc2 overflow-x-auto fixed top-0 right-0 left-0 lg:justify-center  mx-12 sm:mx-24 -mt-2 py-4 pt-6 rounded-b-2xl bg-gray-900 bg-opacity-60 z-50 shadow-xl">
      <img
        onClick={linkHandler}
        className="h-8 pl-8 cursor-pointer"
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        alt="The Movie Data Base Logo"
      />
      <ul className="px-12">
        <NavButton colour="blue" tag="HOME" path="/" paddingx="7" />
        <NavButton colour="red" tag="MOVIES" path="/movies" paddingx="6" />
        <NavButton
          colour="green"
          tag="WATCHLIST"
          path="/watchlist"
          paddingx="4"
        />
        <NavButton colour="purple" tag="QUIZ" path="/quiz" paddingx="8" />
      </ul>

      <SearchBar setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Nav;

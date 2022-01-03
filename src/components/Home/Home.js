import { React, useEffect, useState } from "react";
import MoviesPopular from "./MoviesPopular";
import PeoplePopular from "./PeoplePopular";
import { getMoviesRequest, getPeopleRequest } from "../../API";

const Home = () => {
  // Setting the states for popular movie and popular peope sections as well as the loading state.
  const [moviePop, setMoviePop] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function for requesting popular movies and setting the state.
  const getPopMovies = async () => {
    setLoading(true);
    const response = await getMoviesRequest("popular");
    setMoviePop(response.results);
    setLoading(false);
  };

  // Function for requesting popular people and setting the state.
  const getPopPeople = async () => {
    const response = await getPeopleRequest();
    setPeopleList(response.results);
  };

  // Implement useEffect hook to call the functions and retrieve data asynchronously when the application first loads.
  useEffect(() => {
    getPopMovies();
    getPopPeople();
  }, []);

  // Created a loading spinner
  if (loading) {
    return (
      <div className="lds-dual-ring absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    );
  }

  // Returning appropriate components.
  return (
    <main className="md:mx-10">
      <MoviesPopular moviePop={moviePop} loading={loading} />
      <PeoplePopular peopleList={peopleList} />
    </main>
  );
};

export default Home;

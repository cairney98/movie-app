import { React, useEffect, useState } from "react";
import MoviesPopular from "./MoviesPopular";
import PeoplePopular from "./PeoplePopular";
import { getMoviesRequest, getPeopleRequest } from "../../API";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopMovies = async () => {
    setLoading(true);
    const response = await getMoviesRequest("popular");
    setMovieList(response.results);
    setLoading(false);
  };

  const getPopPeople = async () => {
    const response = await getPeopleRequest();
    setPeopleList(response.results);
  };

  useEffect(() => {
    getPopMovies();
    getPopPeople();
  }, []);

  return (
    <main className="md:mx-10">
      <MoviesPopular movieList={movieList} loading={loading} />
      <PeoplePopular peopleList={peopleList} />
    </main>
  );
};

export default Home;
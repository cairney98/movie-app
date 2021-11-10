const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "3b853b52d4f3c9e4ff2059750e0d7692";

const getMoviesRequest = async (getTerm, page) => {
  const url = `${BASE_URL}movie/${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false&${page}`;
  return await (await fetch(url)).json();
};

const getDiscoverRequest = async (
  page,
  sortby,
  direction,
  minyear,
  maxyear,
  featuring,
  votecount,
  voteaverage,
  oglang,
  withoutgenres,
  withoutkey
) => {
  const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.gte=${minyear}-01-01&primary_release_date.lte=${maxyear}-12-31&sort_by=${sortby}.${direction}&include_adult=false&page=${page}&vote_count.gte=${votecount}${voteaverage}&region=GB${featuring}${oglang}${withoutgenres}${withoutkey}`;
  return await (await fetch(url)).json();
};

const getSearchRequest = async (searchTerm, getTerm) => {
  const url = searchTerm
    ? `${BASE_URL}search/${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false&query=${searchTerm}`
    : "";
  return await (await fetch(url)).json();
};

const getMovieRequest = async (movieId, getTerm) => {
  const url = `${BASE_URL}movie/${movieId}${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false`;
  return await (await fetch(url)).json();
};

const getPersonRequest = async (personId, getTerm) => {
  const url = `${BASE_URL}person/${personId}${getTerm}?api_key=${API_KEY}&language=en-US`;
  return await (await fetch(url)).json();
};

const getPeopleRequest = async () => {
  const url = `${BASE_URL}person/popular?api_key=${API_KEY}&language=en-US`;
  return await (await fetch(url)).json();
};

export {
  BASE_URL,
  API_KEY,
  getMoviesRequest,
  getMovieRequest,
  getDiscoverRequest,
  getPeopleRequest,
  getSearchRequest,
  getPersonRequest,
};

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;


// Fetch request for getting an array of films using terms such as "popular".
const getMoviesRequest = async (getTerm, page) => {
  const url = `${BASE_URL}movie/${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false&${page}`;
  return await (await fetch(url)).json();
};

// Fetch request for filtering through all films based on input criteria - used for MoviesTab section.
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

// Fetch request for searching using 'SearchTerm', getting either films or people using 'getTerm'. 
// If no search input is entered then return list of popular people - used for Starring component.
const getSearchRequest = async (searchTerm, getTerm) => {
  const url = searchTerm
    ? `${BASE_URL}search/${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false&query=${searchTerm}`
    : `${BASE_URL}person/popular?api_key=${API_KEY}&language=en-US`;
  return await (await fetch(url)).json();
};

// Fetch request for a specific movie, getting certain details such as cast using 'getTerm'.
const getMovieRequest = async (movieId, getTerm) => {
  const url = `${BASE_URL}movie/${movieId}${getTerm}?api_key=${API_KEY}&language=en-US&include_adult=false`;
  return await (await fetch(url)).json();
};

// Fetch request for a specific person, getting certain details such as credits using 'getTerm'.
const getPersonRequest = async (personId, getTerm) => {
  const url = `${BASE_URL}person/${personId}${getTerm}?api_key=${API_KEY}&language=en-US`;
  return await (await fetch(url)).json();
};

// Fetch request for getiing popular people.
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

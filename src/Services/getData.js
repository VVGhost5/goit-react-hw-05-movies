import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_key = "7b328a00ac54b898dfd950b7d57d1ea0";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_key,
};

const getPopularMovies = async () => {
  try {
    const popularMovies = await axios.get("/trending/movie/day");

    return popularMovies.data.results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const getMovies = async (query) => {
  try {
    const movie = await axios.get(`/search/movie?query=${query}&page=1`);
    return movie.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getReviews = async (id) => {
  try {
    const reviews = await axios.get(`/movie/${id}/reviews`);
    return reviews.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCredits = async (id) => {
  try {
    const credits = await axios.get(`/movie/${id}/credits`);
    return credits.data.cast;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMovieDetails = async (id) => {
  try {
    const movieDetails = await axios.get(`/movie/${id}`);
    return movieDetails.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const api = {
  getPopularMovies,
  getMovies,
  getMovieDetails,
  getCredits,
  getReviews,
};

export default api;

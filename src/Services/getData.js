import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_key = "7b328a00ac54b898dfd950b7d57d1ea0";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_key,
};

const getPopularMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day");

    return data.results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const getMovies = async (query) => {
  try {
    const { data } = await axios.get(`/search/movie?query=${query}&page=1`);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getReviews = async (id) => {
  try {
    const { data } = await axios.get(`/movie/${id}/reviews`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCredits = async (id) => {
  try {
    const { data } = await axios.get(`/movie/${id}/credits`);
    return data.cast;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(`/movie/${id}`);
    return data;
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

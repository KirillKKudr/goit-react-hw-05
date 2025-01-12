import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjNjZTk4YzJkMjE3ZDRiYmU5NDBlNTRmN2MzZGU3MSIsIm5iZiI6MTczNjM0NjkzMS42NzgwMDAyLCJzdWIiOiI2NzdlOGQzMzM0YTRlNzVlNDk3YjBlYzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._wkB66gnq8cyvaO9YW9-vLn5oiW0TfTRaaIVs79vIsM';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: 'application/json',
    },
};


const fetchTrendingMovies = async () => {
    const { data } = await axios.get(
        `${BASE_URL}/trending/movie/day?language=en-US`,
        options
    );
    return data.results;
};


const fetchMoviesByTitle = async (query) => {
    const { data } = await axios.get(
        `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
    );
    return data.results;
};


const getFullDataMovie = async (moviesId) => {
    const { data } = await axios.get(
        `${BASE_URL}/movie/${moviesId}?language=en-US`,
        options
    );
    return data;
};


const getCast = async (moviesId) => {
    const { data } = await axios.get(
        `${BASE_URL}/movie/${moviesId}/credits?language=en-US`,
        options
    );
    return data.cast;
};


const getReviews = async (moviesId) => {
    const { data } = await axios.get(
        `${BASE_URL}/movie/${moviesId}/reviews?language=en-US&page=1`,
        options
    );
    return data.results;
};

export { fetchTrendingMovies, fetchMoviesByTitle, getFullDataMovie, getCast, getReviews };
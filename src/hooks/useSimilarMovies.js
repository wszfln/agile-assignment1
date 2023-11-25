import { useEffect, useState } from "react";
import {getSimilarMovies} from '../api/tmdb-api'

const useSimilarMovies = id => {
  const [movies, setSimilarMovies] = useState([]);;
  useEffect(() => {
    getSimilarMovies(id).then(movie => {
      setSimilarMovies(movie);
    });
  }, [id]);
  return [movies, setSimilarMovies];
};

export default useSimilarMovies;
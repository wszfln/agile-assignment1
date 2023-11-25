import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromWatch";
import WriteReview from "../components/cardIcons/writeReview";

const MustWatchMoviesPage = () => {
  const {mustWatch: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  console.log(movieIds)
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["toWatch", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatchIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchMoviesPage;
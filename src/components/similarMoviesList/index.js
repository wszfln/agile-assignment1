import React from "react";
import SimilarMovieCard from "../similarMovieCard";
import Grid from "@mui/material/Grid";

const SimilarMovieList = ( { similarMovies }) => {
  let movies = similarMovies.results.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SimilarMovieCard key={m.id} similarMovies={m} />
    </Grid>
  ));
  return movies;
};

export default SimilarMovieList;
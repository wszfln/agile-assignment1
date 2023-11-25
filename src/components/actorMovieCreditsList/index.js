import React from "react";
import ActorMovieCreditCard from "../actorMovieCreditCard";
import Grid from "@mui/material/Grid";

const actorMovieCreditsList = ( { personMovie }) => {
  let credits = personMovie.cast.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <ActorMovieCreditCard key={m.id} personMovie={m} />
    </Grid>
  ));
  return credits;
};

export default actorMovieCreditsList;
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
export default function ActorMovieCreditCard({ personMovie }) {
  return (
    <Card sx={{ minWidth: 210 ,maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {personMovie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
            personMovie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${personMovie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {personMovie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {personMovie.vote_average}{" "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
            <PersonIcon fontSize="small" />
            {personMovie.character}
            </Typography>
          </Grid>
        </Grid>
        <Link to={`/movies/${personMovie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
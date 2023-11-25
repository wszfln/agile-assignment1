import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Grid from "@mui/material/Grid";
import {getCredits} from '../../api/tmdb-api';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import SimilarMovieList from "../similarMoviesList";
import MovieSite from '../movieSite';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie,similarMovies }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movieCredits, setMovieCredits] = useState([]);
  const navigate = useNavigate();

  const handelMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true});
  }

  useEffect(() => {
    console.log(movie)
    getCredits(movie.id).then(movie => {
      setMovieCredits(movie)
    })
  },[])

  console.log(movieCredits.cast)

  return (
    <>
      <div style={{ 
        background: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`, 
        backgroundSize: 'cover',
        width: '100%',
        height: '600px',
      }}>
      </div>

      <Container style={{marginTop: '2rem'}}>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}> 
          <p style={{fontSize: "3rem", margin: '0', fontWeight: 'bold'}}>{movie.title}</p>
          <p style={{marginLeft: '5%', fontSize: '1.5rem'}}>{movie.tagline?'-':''} {movie.tagline}</p>
        <Stack>
        <Stack style={{marginTop: '2rem'}} direction="row" spacing={1}>
          <MovieFilterIcon />
          <p>{movie.release_date}</p>
          <p style={{textTransform:'uppercase'}}>({movie.original_language})</p>
          <p>·</p>
          <p>{movie.production_countries[0].iso_3166_1}</p>
          <p>·</p>
          <p>{movie.runtime} minutes</p>
        </Stack>
        <Stack style={{listStyle: 'none', marginTop: '1rem'}} direction="row" >
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{...chip}} />
            </li>
          ))}
        </Stack>
        </Stack>

        <Stack style={{marginTop: '1rem'}} spacing={1}>
          <Rating name="half-rating-read" defaultValue={(movie.vote_average)/2} precision={0.5} readOnly />
        </Stack>
        <Stack>
          <p style={{fontSize: '2rem', marginBottom: '0'}}>Overview</p>
          <p style={{fontSize: '1.2rem'}}>{movie.overview}</p>
        </Stack>
        </Grid>
        <Grid item xs={5} sx={{ marginLeft: 'auto' }}>
          <MovieSite movie={movie} />
        </Grid>  
      </Grid>

      <Container style={{ overflowX: 'scroll'}}>
        <Typography style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          Series Cast
        </Typography>
        <Paper elevation={3}>
          <Stack direction="row" spacing={2}>
            {movieCredits && movieCredits.cast && movieCredits.cast.slice(0,9).map((movie) => (

              <Card key={movie.id} style={{overflow: 'visible', margin: '1rem'}}>
                <CardMedia
                  component="img"
                  height={300}
                  image={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold'}} gutterBottom  component="div">
                    {movie.original_name}
                  </Typography>
                  <Typography gutterBottom  component="div">
                    {movie.character}
                  </Typography>        
                </CardContent>
                <CardActions >
                <Button onClick={() => handelMenuSelect(`/people/${movie.id}`)} style={{ width: '15rem'}}>
                  Learn More
                </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
    </Container>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
        <Typography style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
        Similar Movies
      </Typography>
      <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <SimilarMovieList similarMovies={similarMovies}/>
      </Grid>
    </Grid>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;
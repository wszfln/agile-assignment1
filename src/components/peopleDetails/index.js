import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CakeIcon from '@mui/icons-material/Cake';
import ActorMovieCreditsList from "../actorMovieCreditsList"
import Grid from "@mui/material/Grid";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const PeopleDetails = ({ person, personMovie }) => {  
    function age(person){
        const date = new Date();
        if (person.birthday === null){
            return null
        }
        var fullDate = person.birthday;
        var currentYear = date.getFullYear();
        var birthYearInt = parseInt(fullDate.slice(0, 4));
        var age = currentYear - birthYearInt
        return age
    }
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
      {person.biography}
      </Typography>
      <Paper component="ul" sx={{...root}}>
        <Chip  label={`Popularity: ${Math.round(person.popularity)}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
        <Chip icon={<CakeIcon />} label={`${person.birthday}`} color="primary" />
        <Chip label={`Age ${String(age(person))}`} color="primary"/>
        </li>

      </Paper>
      <Typography style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
        Acted Movies
      </Typography>
      <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <ActorMovieCreditsList personMovie={personMovie}/>
      </Grid>
    </Grid>

      </>
  );
};
export default PeopleDetails ;
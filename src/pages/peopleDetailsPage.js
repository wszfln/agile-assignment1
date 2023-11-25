import React from "react";
import { useParams } from 'react-router-dom';
import PersonDetails from "../components/peopleDetails/";
import PageTemplate from "../components/templatePeoplePage";
import { getPerson, getPeopleMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const PeopleDetailsPage = (props) => {
  const { id } = useParams();
  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );
  const { data: personMovie } = useQuery(
    ["person movie credits", { id: id }],
    getPeopleMovieCredits
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
          <PageTemplate person={person}>
            <PersonDetails person={person} personMovie={personMovie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default PeopleDetailsPage;
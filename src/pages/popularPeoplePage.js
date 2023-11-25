import React from "react";
import PeoplePageTemplate from '../components/templatePeopleListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getPopularPeople } from "../api/tmdb-api";
const PopularPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('popular people', getPopularPeople)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const people = data.results;

  return (
    <PeoplePageTemplate
      title='Popular Actors'
      people={people}
      action={(person) => {

      }}
    />
  );
};
export default PopularPage;
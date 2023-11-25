import React,{ useState} from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";
import ReactPaginate from "react-paginate";

const MovieList = ( {movies, action }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 10;
  const pagesVisited = pageNumber*moviesPerPage;
  const movieCards = movies.slice(pagesVisited, pagesVisited + moviesPerPage).map((m) => {
    return (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
    );
  });
  const pageCount = Math.ceil(movies.length / moviesPerPage);
  const handlePageClick = ({selected}) => {
    setPageNumber(selected);
  }
  return (
    <>
      {movieCards}

      <div style={{position: 'fixed', bottom: '0', right: '0' , margin: '10px' }}>
        <ReactPaginate 
        previousLabel={"previous"}
        nextLabel={"next"}
        breaklabel={'...'}
        pageCount={pageCount}
        marginPagesDiaplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        pageClassName={"page-item"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
      </div>
    </> 
        
 );
};

export default MovieList;
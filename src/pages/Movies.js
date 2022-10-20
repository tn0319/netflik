import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Pagination from "react-js-pagination";

const Movies = () => {
  const { movieGnere, popularMovies } = useSelector(state => state.movie)
  const { searchVal } = useSelector(state => state.search)
  const [filterVal, setFilterVal] = useState(0);
  const [page, setPage] = useState(1);
  const itemsCountPerPage = 8;
  const [fristItemIndex, setFristItemIndex] = useState(0);
  let [lastItemIndex, setLastItemIndex] = useState(itemsCountPerPage);

  let movieList = popularMovies;

  const handlePageChange = (page) => {
    let standardPage = page - 1;
    setPage(page);
    setFristItemIndex(standardPage * itemsCountPerPage);
    setLastItemIndex(standardPage * itemsCountPerPage + itemsCountPerPage);
  };


  function handleFilterSelector(e) {
    setFilterVal(Number(e.target.value));
  }

  if (searchVal !== '') {
    movieList = popularMovies.filter(ele => ele.title.toLowerCase().includes(searchVal.toLowerCase()));
  } else if (filterVal !== 0) {
    movieList = popularMovies.filter(ele => ele.genre_ids.includes(filterVal));
  }

  return (
    <div className="inner movies">
      <div className="left">
        <Form.Select bg="dark" aria-label="Default select example" onChange={handleFilterSelector}>
          <option value="basic">Filter</option>
          {movieGnere.map(ele => (
            <option key={ele.id} value={ele.id}>{ele.name}</option>
          ))}
        </Form.Select>
      </div>
      <div className="right">
        {searchVal !== "" && <p className='result'>"<span className='red'>{searchVal}</span>"에 대한 검색 결과입니다.</p>}
        <ul className="list-wrap">
          {console.log(fristItemIndex, lastItemIndex)}
          {
            movieList.slice(fristItemIndex, lastItemIndex).map(ele => (
              <li key={ele.id}><MovieCard item={ele} /></li>
            ))
          }
        </ul>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={movieList.length}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Movies

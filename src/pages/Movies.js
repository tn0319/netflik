import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { movieGnere, popularMovies } = useSelector(state => state.movie)
  const { searchVal } = useSelector(state => state.search)
  const [filterVal, setFilterVal] = useState(0);
  let movieList = popularMovies;

  function handleFilterSelector(e) {
    setFilterVal(Number(e.target.value));
  }

  if (searchVal !== '') {
    movieList = popularMovies.filter(ele => ele.title.toLowerCase().includes(searchVal.toLowerCase()));
  } else if (filterVal !== 0) {
    movieList = popularMovies.filter(ele => ele.genre_ids.includes(filterVal));
  }

  return (
    <div>
      <div className='left'>
        <Form.Select aria-label="Default select example" onChange={handleFilterSelector}>
            <option value="basic">Filter</option>
            {movieGnere.map(ele => (
              <option value={ele.id}>{ele.name}</option>
            ))}
        </Form.Select>
      </div>
      <div className='right'>
        <ul>
          {
            movieList.map(ele => (
             <li key={ele.id}><MovieCard item={ele} /></li>
          ))
          }
          </ul>
      </div>
    </div>
  )
}

export default Movies

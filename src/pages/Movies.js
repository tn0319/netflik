import React from 'react'
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { movieGnere, popularMovies } = useSelector(state => state.movie)
  

  function handleFilterSelector(val) {
    console.log(val);
  }
  return (
    <div>
      <div className='left'>
      <Form.Select aria-label="Default select example">
        <option>Sort</option>
        <option value="1">오름차순</option>
        <option value="2">내림차순</option>
        <option value="3">인기순</option>
      </Form.Select>
      <Form.Select aria-label="Default select example" onChange={handleFilterSelector}>
          <option>Filter</option>
          {movieGnere.map(ele => (
            <option>{ele.name}</option>
          ))}
      </Form.Select>
      </div>
      <div className='right'>
        <ul>
          {
            popularMovies.map(ele => (
             <li><MovieCard item={ele} key={ele.id} /></li>
          ))
          }
          </ul>
      </div>
    </div>
  )
}

export default Movies

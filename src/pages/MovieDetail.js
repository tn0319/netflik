import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import {movieAction} from '../redux/actions/movieAction'

const MovieDetail = () => {
  const location = useLocation();
  const movie = location.state;
  const dispatch = useDispatch();
  const { movieReviews, relatedMovies } = useSelector(state => state.movie)
  
  useEffect(() => {
    dispatch(movieAction.getReviews(movie.id))
    dispatch(movieAction.getRelatedMovies(movie.id))
  }, []);
  
  console.log('리뷰', movieReviews.results);
  console.log('추천뮤비', relatedMovies.results);
  
  return (
    <div className='inner movieDetail'>
      <div className='movieInfo'>
      <div className='left'>
        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.original_title} />
      </div>
      <div className='right'>
        <div className='gerneWrap'></div>
        <h1 className='title'>{movie.title}</h1>
        <p className='sDesc'></p>
        <div className='infoWrap'>
          <span>👍{movie.vote_average}</span>
          <span>😀{movie.popularity}</span>
          <span>{movie.adult ? "👪" : ""}</span>
        </div>
        <p className='bDesc'>{movie.overview}</p>
        <div className='infoBedgeWrap'>
        </div>

        </div>
      </div>

      <div className='movieReview'>
        <div className='movieReview'>
          <ul>
            {
              Object.keys(movieReviews).length !== 0 ? //* movieReviews의 값이 있을 경우 map을 사용함
              movieReviews.results.map(ele => (
                <li key={ele.id}>{ele.content}</li>
              )) : null
            }
            </ul>
        </div>
        <div className='relatedMovies'>
          <ul>
            {
              relatedMovies.length > 0 ?
              relatedMovies.results.map(ele => {
                <li><MovieCard item={ele} key={ele.id} /></li>
              }) : null
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail

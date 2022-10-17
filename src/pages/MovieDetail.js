import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { movieAction } from '../redux/actions/movieAction'
import Button from 'react-bootstrap/Button';

const MovieDetail = () => {
  const location = useLocation();
  const movie = location.state;
  const dispatch = useDispatch();
  const { movieReviews, relatedMovies } = useSelector(state => state.movie)
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(movieAction.getReviews(movie.id))
    dispatch(movieAction.getRelatedMovies(movie.id))
    setActiveTab(0)
  }, [movie]);
  
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

      <div className='tabWrap'>
        <div>
          <Button variant={ activeTab === 0 ? "danger" : "secondary"} onClick={()=>setActiveTab(0)}>
            REVIEWS ({movieReviews.length})
          </Button>
          <Button variant={activeTab === 1 ? "danger" : "secondary"} onClick={() => setActiveTab(1)}>
            RELATED MOVIES ({relatedMovies.length})
          </Button>
        </div>
        {
          activeTab === 0 ?
          <div className='movieReview'>
            <ul>
              {
                  movieReviews.map(ele => (
                  <li key={ele.id}>{ele.content}</li>
                ))
              }
              </ul>
          </div> :
          <div className='relatedMovies'>
              <ul>
              {
                relatedMovies.map(ele => (
                  <li><MovieCard item={ele} key={ele.id}/></li>
                ))
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default MovieDetail

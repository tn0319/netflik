import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieAction } from '../redux/actions/movieAction'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector(state => state.movie)
  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, [])

  if (loading) {
    return <ClipLoader color='#fff' loading={loading} size={150} />
  }
  return (
    <div className="home">
      <Banner movie={popularMovies[0]} />

      <div className="inner">
        <h2 className="movie-tit">Popular Movie</h2>
        <MovieSlide movies={popularMovies} />
        <h2 className="movie-tit">Top Rated Movie</h2>
        <MovieSlide movies={topRatedMovies} />
        <h2 className="movie-tit">Upcoming Movie</h2>
        <MovieSlide movies={upComingMovies} />
      </div>
    </div>
  )
}

export default Home

import React from 'react'

const Banner = ({ movie }) => {
  return (
    <div className="banner" style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})` }}>
      <div className="banne-info inner">
        <h1 className="banner-tit">{movie.title}</h1>
        <p className="desc">{movie.overview}</p>
      </div>
    </div>
  )
}

export default Banner

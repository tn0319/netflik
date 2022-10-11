import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';


// 장르 id가 같을 시, name을 출력함
const MovieCard = ({ item }) => {
    const { movieGnere } = useSelector(state => state.movie);
  return (
    <div className="card" style={{backgroundImage : `url('https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}')`}}>
        <div className="overlay">
            <h2>{item.title}</h2>
            <div>
                  {item.genre_ids.map(id => (
                      <Badge bg="danger">{movieGnere.find(item=>item.id==id).name}</Badge>
                  )
                )}
            </div>
            <div>
                <span>{item.vote_average}</span><span>{item.adult ? "청불": "Under 18"}</span>
            </div>
        </div>
    </div>
  )
}

export default MovieCard

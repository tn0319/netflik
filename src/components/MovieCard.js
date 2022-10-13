import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// 장르 id가 같을 시, name을 출력함
const MovieCard = ({ item }) => {
    const { movieGnere } = useSelector(state => state.movie);
    const navigate = useNavigate();
    function goToDetail() {
        navigate(
            `/movies/:${item.id}`,
            { state: { ...item } })
    }
    return (
    <div onClick={goToDetail} className="card" style={{backgroundImage : `url('https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}')`}}>
        <div className="overlay">
            <h2>{item.title}</h2>
            <div>
                  {item.genre_ids.map(id => (
                      <Badge bg="danger" key={id}>{movieGnere.find(item=>item.id===id).name}</Badge>
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

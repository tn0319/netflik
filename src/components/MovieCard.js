import React, {useState} from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MovieTrailer from './MovieTrailer';

// 장르 id가 같을 시, name을 출력함
const MovieCard = ({ item }) => {
    const { movieGnere } = useSelector(state => state.movie);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    function goToDetail() {
        navigate(
            `/movies/:${item.id}`,
            { state: { ...item } })
    }
    return (
        <>
        <div onClick={goToDetail} className="card" style={{backgroundImage : `url('https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}')`}}>
            <div className="overlay">
                <h2>{item.title}</h2>
                    <div>
                        {
                            item.genre_ids.map(genreId => (
                            <Badge bg="danger" key={genreId}>{movieGnere.find(ele=>ele.id === genreId).name}</Badge>
                        ))}
                </div>
                <div>
                    <span>{item.vote_average}</span><span>{item.adult ? "청불": "Under 18"}</span>
                    </div>
                    <Button variant="primary" onClick={() => setModalShow(true)}>예고편 재생</Button>
            </div>
        </div>
        <MovieTrailer show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default MovieCard

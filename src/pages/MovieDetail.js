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
		< div className="inner movie-detail" >
			{console.log(movie)}
			<div className="movie-info">
				<div className="left">
					<img className="poster" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.original_title} />
				</div>
				<div className="right">
					<div className="gerne-wrap"></div>
					<h1 className="tit">{movie.title}</h1>
					<p className="desc">{movie.overview}</p>
					<div className="info-wrap">
						<span>👍 {movie.vote_average}</span>
						<span>😀 {movie.popularity}</span>
						<span>{movie.adult ? "👪" : ""}</span>
					</div>
				</div>
			</div>

			<div className="tab-wrap">
				<div className='btn-wrap'>
					<Button variant={activeTab === 0 ? "danger" : "secondary"} onClick={() => setActiveTab(0)}>
						REVIEWS ({movieReviews.length})
					</Button>
					<Button variant={activeTab === 1 ? "danger" : "secondary"} onClick={() => setActiveTab(1)}>
						RELATED MOVIES ({relatedMovies.length})
					</Button>
				</div>
				<div className='cont-wrap'>
					{
						activeTab === 0 ?
							<div className="movie-review">
								{
									movieReviews.length > 0 ?
										<ul>
											{
												movieReviews.map(ele => (
													<li key={ele.id}>{ele.content}</li>
												))
											}
										</ul> :
										<p className="nolist">There are no reviews for this movie..🤣</p>
								}
							</div> :
							<div className="related-movies">
								<ul>
									{
										relatedMovies.map(ele => (
											<li key={ele.id}><MovieCard item={ele} /></li>
										))
									}
								</ul>
							</div>
					}
				</div>
			</div>
		</div >
	)
}

export default MovieDetail

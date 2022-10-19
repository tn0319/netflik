import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';

const Navigation = () => {
	const [searchVal, setSearchVal] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSearchClick(e) {
		e.preventDefault();

		dispatch({
			type: "SEARCH_VALUE",
			payload: { searchVal }
		})

		navigate('/movies');
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container fluid>
				<Navbar.Brand href="#"><img width={100} src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" /></Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						<Link to="/" className="nav-item">Home</Link>
						<Link to="/movies" className="nav-item">Movies</Link>
					</Nav>
					<Form className="d-flex" onSubmit={handleSearchClick}>
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							value={searchVal}
							onChange={(e) => { setSearchVal(e.target.value) }}
						/>
						<Button variant="outline-danger" type="submit">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

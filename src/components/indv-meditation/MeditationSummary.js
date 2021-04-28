import React from 'react';
import { Link } from 'react-router-dom';
// import ApiContext from '../../context/ApiContext';

export default function MeditationSummary(props) {
	// static contextType = ApiContext;

	const { meditation } = props;

	return (
		<li key={meditation.id} className='meditation-list-item'>
			<span>{meditation.date}</span>
			<div className='button-container'>
				<Link to={`/${meditation.id}`}>
					<button type='button'>See More</button>
				</Link>
			</div>
		</li>
	);
}

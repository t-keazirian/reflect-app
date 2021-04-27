import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../context/ApiContext';

class MeditationSummary extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	static contextType = ApiContext;

	render() {
		const { meditation } = this.props;

		return (
			<div key={meditation.id} className='meditation-item'>
				<li key={meditation.id} className='meditation-list-item'>
					<h4>Description:</h4> <span>{meditation.description}</span>
					<h4>Minutes Meditated: </h4> <span>{meditation.minutes}</span>
					<h4>Date Meditated:</h4> <span>{meditation.date}</span>
					<div className='button-container'>
						<Link to={`/${meditation.id}`}>
							<button type='button'>See More</button>
						</Link>
					</div>
				</li>
			</div>
		);
	}
}

export default MeditationSummary;

import React from 'react';
import { Link } from 'react-router-dom';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

class MeditationSummary extends React.Component {
	render() {
		const { meditation } = this.props;

		let smiley;
		if (meditation.current_mood === 'happy') {
			smiley = (
				<FontAwesomeIcon className='font-awesome' icon={faSmile} size='2x' />
			);
		} else if (meditation.current_mood === 'meh') {
			smiley = (
				<FontAwesomeIcon className='font-awesome' icon={faMeh} size='2x' />
			);
		} else if (meditation.current_mood === 'sad') {
			smiley = (
				<FontAwesomeIcon icon={faFrown} size='2x' className='font-awesome' />
			);
		}

		return (
			<div>
				<li key={meditation.id} className='meditation-list-item'>
					<span>{format(new Date(meditation.date), 'EEEE MM/dd/yyyy')}</span>
					<span>{smiley}</span>
					<span>{meditation.description}</span>
					<div className='button-container'>
						<Link to={`/meditation/${meditation.id}`}>
							<button type='button'>See More</button>
						</Link>
					</div>
				</li>
			</div>
		);
	}
}

export default MeditationSummary;

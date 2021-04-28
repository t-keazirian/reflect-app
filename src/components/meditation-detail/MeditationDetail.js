import React from 'react';
import ApiContext from '../../context/ApiContext';

class MeditationDetail extends React.Component {

	static contextType = ApiContext;

	handleClickDelete = () => {
		const meditationId = parseInt(this.props.match.params.id, 10);
		this.context.deleteMeditation(meditationId);
		this.props.history.push('/dashboard');
	};

	handleClickGoBack = () => {
		this.props.history.push('/dashboard');
	};

	render() {
		const indvMeditation = this.context.meditations.find(
			meditation => meditation.id === parseInt(this.props.match.params.id, 10)
		);

		return (
			<div className='main-meditation'>
				<header>
					<h1>Your Meditation Overview</h1>
				</header>
				<div className='details'>
					<div className='summary'>
						<h3>Word:</h3>
						<p>{indvMeditation.description}</p>
						<h3>Date:</h3>
						<p>{indvMeditation.date}</p>
						<h3>Minutes this session:</h3>
						<p>{indvMeditation.minutes}</p>
					</div>
					<div className='reflections'>
						<h3>Reflections:</h3>
						<p className='reflections-p'>{indvMeditation.reflections}</p>
					</div>
				</div>
				<div className='buttons'>
					<button
						type='submit'
						className='go-back-btn'
						onClick={this.handleClickGoBack}
					>
						Go Back
					</button>
					<button
						type='submit'
						className='delete-btn'
						onClick={this.handleClickDelete}
					>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

export default MeditationDetail;

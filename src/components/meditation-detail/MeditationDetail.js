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
					<h1>Your Reflection</h1>
				</header>
				<div className='details'>
					<div className='summary'>
						<p>{indvMeditation.date}</p>
						<p>{indvMeditation.description}</p>
					</div>
					<div className='reflections'>
						<p className='reflections-p'>{indvMeditation.notes}</p>
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

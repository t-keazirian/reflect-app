import React from 'react';
import config from '../../config';
import ApiContext from '../../context/ApiContext';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

class MeditationDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			description: '',
			minutes: 5,
			current_mood: '',
			notes: '',
			date: '',
		};
	}

	static contextType = ApiContext;

	componentDidMount() {
		const meditationId = this.props.match.params.id;
		fetch(`${config.API_BASE_URL}/${meditationId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(meditation => {
				this.setState({
					id: meditation.id,
					description: meditation.description,
					minutes: 5,
					current_mood: meditation.current_mood,
					notes: meditation.notes,
					date: meditation.date,
				});
			});
	}

	handleClickDelete = () => {
		const meditationId = parseInt(this.props.match.params.id, 10);

		fetch(`${config.API_BASE_URL}/${meditationId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
		}).then(() => {
			this.context.deleteMeditation(meditationId);
		});
		this.props.history.push('/dashboard');
	};

	handleClickGoBack = () => {
		this.props.history.push('/dashboard');
	};

	render() {
		const { id, description, notes, current_mood, date } = this.state;

		let smiley;
		if (current_mood === 'happy') {
			smiley = (
				<FontAwesomeIcon className='font-awesome' icon={faSmile} size='2x' />
			);
		} else if (current_mood === 'meh') {
			smiley = (
				<FontAwesomeIcon className='font-awesome' icon={faMeh} size='2x' />
			);
		} else if (current_mood === 'sad') {
			smiley = (
				<FontAwesomeIcon icon={faFrown} size='2x' className='font-awesome' />
			);
		}

		return (
			<div className='main-meditation'>
				<header>
					<h1>Your Reflection</h1>
				</header>
				<div key={id} className='details'>
					<div className='summary'>
						<p>
							<Moment format='dddd MMM D YYYY'>{date}</Moment>
						</p>
						<p>{smiley}</p>
						<p>{description}</p>
					</div>
					<div className='reflections'>
						<p className='reflections-p'>{notes}</p>
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

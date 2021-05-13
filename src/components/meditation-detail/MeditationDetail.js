import React from 'react';
import config from '../../config';
import ApiContext from '../../context/ApiContext';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import TokenService from '../../services/token-service';

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
		// get the user id
		// res.body.id

		const meditationId = this.props.match.params.id;
		fetch(`${config.API_BASE_URL}/reflections/meditations/${meditationId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
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

		fetch(`${config.API_BASE_URL}/reflections/meditations/${meditationId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
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
							{date ? format(new Date(date), 'EEEE MM/dd/yyyy') : 'Loading...'}
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
					<Link to={`/edit/${id}`}>
						<button type='submit' className='delete-btn'>
							Edit
						</button>
					</Link>
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

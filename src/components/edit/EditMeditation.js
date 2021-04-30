import React from 'react';
import ApiContext from '../../context/ApiContext';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config';
import Moment from 'react-moment';

class EditMeditation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			description: '',
			minutes: 5,
			notes: '',
			current_mood: '',
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

	handleDescriptionChange = e => {
		this.setState({
			description: e.target.value,
		});
	};

	handleCurrentMoodChange = e => {
		this.setState({
			current_mood: e.target.value,
		});
	};

	handleNotesChange = e => {
		this.setState({
			notes: e.target.value,
		});
	};

	handleCancel = () => {
		this.props.history.push('/dashboard');
	};

	handleSubmit = e => {
		e.preventDefault();
		const { id, description, minutes, current_mood, notes, date } = this.state;
		const meditationId = parseInt(this.props.match.params.id);
		const editedMeditation = {
			id,
			description,
			minutes,
			current_mood,
			notes,
			date,
		};

		fetch(`${config.API_BASE_URL}/${meditationId}`, {
			method: 'PATCH',
			body: JSON.stringify(editedMeditation),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
			})
			.then(() => {
				this.context.editMeditation(editedMeditation);
			});
		this.props.history.push('/dashboard');
	};

	render() {
		const { id, description, notes, date } = this.state;
		return (
			<div className='main-meditation'>
				<header>
					<h1>Your Reflection</h1>
				</header>
				<div key={id} className='details'>
					<form className='summary' onSubmit={this.handleSubmit}>
						<p>
							<Moment format='dddd MMM D YYYY'>{date}</Moment>
						</p>
						<label htmlFor='description'></label>
						<h2>Change description:</h2>
						<input
							type='text'
							name='description'
							id='description'
							value={description}
							onChange={this.handleDescriptionChange}
						/>
						<div className='mood'>
							<h2>Edit Your Mood:</h2>
						</div>
						<div className='radio' onChange={this.handleCurrentMoodChange}>
							<input
								type='radio'
								value='sad'
								name='current_mood'
								id='sad'
								required
							/>
							<label htmlFor='sad'>
								<FontAwesomeIcon
									icon={faFrown}
									size='2x'
									className='font-awesome'
								/>
							</label>
							<input type='radio' value='meh' name='current_mood' id='meh' />
							<label htmlFor='meh'>
								<FontAwesomeIcon
									className='font-awesome'
									icon={faMeh}
									size='2x'
								/>
							</label>
							<input
								type='radio'
								value='happy'
								name='current_mood'
								id='happy'
							/>
							<label htmlFor='happy'>
								<FontAwesomeIcon
									className='font-awesome'
									icon={faSmile}
									size='2x'
								/>
							</label>
						</div>
						<div className='reflection-text'>
							<h2>Reflections:</h2>
							<label htmlFor='reflections'></label>
							<p className='reflections-p'>
								Write down any thoughts that come to mind as you reflect on
								today's practice.
							</p>
							<textarea
								name='reflections'
								id='reflections'
								cols='40'
								rows='10'
								value={notes}
								onChange={this.handleNotesChange}
							></textarea>
						</div>
						<button type='submit' className='submit-btn'>
							Submit
						</button>
					</form>
				</div>
				<div className='buttons'>
					<button
						type='submit'
						className='go-back-btn'
						onClick={this.handleCancel}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default EditMeditation;

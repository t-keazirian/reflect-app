import React from 'react';
import config from '../../config';
import ApiContext from '../../context/ApiContext';

class MeditationDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// how would I add current mood? look at SQL
			id: '',
			description: '',
			minutes: 5,
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
		const { id, description, notes, date } = this.state;

		return (
			<div className='main-meditation'>
				<header>
					<h1>Your Reflection</h1>
				</header>
				<div key={id} className='details'>
					<div className='summary'>
						<p>{date}</p>
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

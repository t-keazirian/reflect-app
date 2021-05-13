import React from 'react';
import TotalMeditations from '../total-meditations/TotalMeditations';
import ApiContext from '../../context/ApiContext';
import { Link } from 'react-router-dom';
import MoodSearch from '../MoodSearch/MoodSearch';
import config from '../../config';
import TokenService from '../../services/token-service';

class Dashboard extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		meditations: [],
	// 	};
	// }

	static contextType = ApiContext;

	componentDidMount() {
		const user_id = TokenService.getUserId();

		fetch(`${config.API_BASE_URL}/reflections/${user_id}`, {
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
			.then(meditations => {
			// 	this.setState({
			// 		meditations: sortDates(meditations),
			// 	});

				this.context.setMeditations(meditations);
			});
	}

	render() {
		const { meditations } = this.context;

		const minutesTotal = meditations.reduce(
			(total, meditation) => total + meditation.minutes,
			0
		);

		let minutesMessage;
		if (minutesTotal === 0) {
			minutesMessage = (
				<h2 className='dash-h'>
					Select Start New Meditation above to practice your first meditation!
				</h2>
			);
		} else {
			minutesMessage = (
				<h2 className='dash-h'>
					You have meditated for {minutesTotal} minutes!
				</h2>
			);
		}

		let totalHeader;
		if (minutesTotal === 0) {
			totalHeader = (
				<h3 className='dash-h'>
					Your list of meditations will appear below...
				</h3>
			);
		} else {
			totalHeader = <h3 className='dash-h'>Total Meditations:</h3>;
		}

		return (
			<div className='dashboard'>
				<header>
					<h1 className='dash-h'>Meditation Dashboard</h1>
				</header>
				<div className='med-summary'>
					<Link to='/start'>
						<button type='submit' className='start-med-btn'>
							Start New Meditation
						</button>
					</Link>
					{minutesMessage}
					<MoodSearch />
					{totalHeader}
				</div>

				<section className='meditations'>
					<TotalMeditations meditations={meditations} />
				</section>
			</div>
		);
	}
}

export default Dashboard;

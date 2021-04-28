import React from 'react';
import TotalMeditations from '../total-meditations/TotalMeditations';
import ApiContext from '../../context/ApiContext';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
	static contextType = ApiContext;

	render() {
		const { meditations } = this.context;

		const minutesTotal = meditations.reduce(
			(total, meditation) => total + meditation.minutes,
			0
		);

		return (
			<div className='dashboard'>
				<header>
					<h1>Meditation Dashboard</h1>
				</header>
				<div className='med-summary'>
					<Link to='/start'>
						<button type='submit' className='start-med-btn'>Start New Meditation</button>
					</Link>
				<h2 className='dash-h'>You have meditated for {minutesTotal} minutes!</h2>
				<h3 className='dash-h'>Total Meditations:</h3>
				</div>
				<section className='meditations'>
					<TotalMeditations />
				</section>
			</div>
		);
	}
}

export default Dashboard;

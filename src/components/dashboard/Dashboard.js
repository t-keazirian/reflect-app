import React from 'react';
import TotalMeditations from '../total-meditations/TotalMeditations';
import ApiContext from '../../context/ApiContext';

class Dashboard extends React.Component {
	static contextType = ApiContext;

	render() {
		const { meditations } = this.context;

		const minutesTotal = meditations.reduce(
			(total, meditation) => total + meditation.minutes,
			0
		);

		return (
			<div className='main'>
				<div className='dashboard'>
					<header>
						<h1>My Meditation Dashboard</h1>
					</header>
					<div className='add-btn'>
						<button type='submit'>Start New Meditation</button>
					</div>
					<div className='minutes'>
						<h2>You have meditated for {minutesTotal} minutes!</h2>
					</div>

					<section className='meditations'>
						<h3>Total Meditations:</h3>
						<div className='total'>
							<TotalMeditations />
						</div>
					</section>
				</div>
			</div>
		);
	}
}

export default Dashboard;

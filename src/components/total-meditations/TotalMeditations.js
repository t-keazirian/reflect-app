import React from 'react';
import MeditationSummary from '../indv-meditation/MeditationSummary';
import ApiContext from '../../context/ApiContext';

class TotalMeditations extends React.Component {
	static contextType = ApiContext;

	render() {
		return (
			<div className='total-meditations'>
				<div className='meditation-container'>
					<div className='list'>
						<ul>
							{this.context.meditations.map(meditation => (
								<MeditationSummary
									meditation={meditation}
									key={meditation.id}
								/>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default TotalMeditations;

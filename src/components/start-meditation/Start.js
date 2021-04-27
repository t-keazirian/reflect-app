import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


const renderTime = ({ remainingTime }) => {
	if (remainingTime === 0) {
		return <div className='timer'>Your meditation session has ended. Great job!</div>;
	}

	return (
		<div className='timer'>
			<div className='text'>Remaining</div>
			<div className='value'>{remainingTime}</div>
			<div className='text'>seconds</div>
		</div>
	);
};

export default function Start() {
	return (
		<div className='start'>
			<h1>
				CountdownCircleTimer
				<br />
				React Component
			</h1>
			<div className='timer-wrapper'>
				<CountdownCircleTimer
					isPlaying
					duration={180}
					colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
					onComplete={() => [false, 1000]}
				>
					{renderTime}
				</CountdownCircleTimer>
			</div>
        
		</div>
	);
}

/*

class Start extends React.Componet {
	constructor() {
		super();
		this.state = {
			minutes: '',
			seconds: '',
		};
	}

  render() {

   
    
    return (

    )
  }
}

export default Start;
*/

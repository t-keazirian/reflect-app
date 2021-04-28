import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Link } from 'react-router-dom';

const children = ({ remainingTime }) => {
	if (remainingTime === 0) {
		return (
			<div className='timer'>
				<p className='timer-p'>Your meditation session has ended</p>
				<Link to='/reflect'>
					<button type='button'>Reflect</button>
				</Link>
			</div>
		);
	} else if (remainingTime === 240 || remainingTime === 180 || remainingTime === 120 || remainingTime === 60 ) {
    return (
			<div className='timer'>
				<p>Breathe</p>
			</div>
		);
  }

	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60 < 10 ? "0" + remainingTime % 60 : remainingTime % 60;

	return (
		<div className='timer'>
			<div className='text'>Remaining</div>
			<div className='value'>{`${minutes}:${seconds}`}</div>
		</div>
	);
};

export default function Start() {
	return (
		<div className='start'>
			<h1>Mindfulness begins here...</h1>
			<div className='timer-wrapper'>
				<CountdownCircleTimer
					isPlaying
					duration={30}
					colors={[['#EE2677', 0.2], ['#E87EA1', 0.2], ['#E86252', 0.2], ['#EBB3A9', 0.2], ['#EE7B30']]}
					onComplete={() => [false, 0]}
				>
					{children}
				</CountdownCircleTimer>
			</div>
      <h4 className='start-h4'>
      “Mindfulness is simply being aware of what is happening right now without wishing it were different; enjoying the pleasant without holding on when it changes (which it will); being with the unpleasant without fearing it will always be this way (which it won't).” – James Baraz
			</h4>
		</div>
	);
}

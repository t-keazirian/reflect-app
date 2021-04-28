import React from 'react';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../../context/ApiContext';
import ValidationError from '../validation-error/ValidationError';

class Reflection extends React.Component {
	constructor() {
		super();
		this.state = {
			description: {
				value: '',
				touched: false,
			},
			mood: {
				value: '',
				touched: false,
			},
			reflections: {
				value: '',
				touched: false,
			},
		};
	}

	static contextType = ApiContext;

	updateDescription = description => {
		this.setState({
			description: {
				value: description,
				touched: true,
			},
		});
	};

	updateMood = mood => {
		this.setState({
			mood: {
				value: mood,
				touched: true,
			},
		});
	};

	updateReflections = reflections => {
		this.setState({
			reflections: {
				value: reflections,
				touched: true,
			},
		});
	};

	validateDescription = () => {
		const { description } = this.state;
		if (description.value === '') {
			return 'Please describe your meditation session.';
		}
	};

	validateReflections = () => {
		const { reflections } = this.state;
		if (reflections.value === '') {
			return 'Please reflect on your meditation session.';
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		const { description, mood, reflections } = this.state;
    const { meditations } = this.context;
		const newMeditation = {
      id: meditations.length+1,
			description: description.value,
			mood: mood.value,
			reflections: reflections.value,
      date: Date.now(),
		};
		this.context.addMeditation(newMeditation);
		this.props.history.push('/dashboard');
	};

	render() {
		const { description, reflections } = this.state;
		const descriptionError = this.validateDescription();
		const reflectionsError = this.validateReflections();
		return (
			<div>
				<header>
					<h1>REFLECT</h1>
				</header>
				<div className='reflect-box'>
        <p className='reflections-p'>Take a few moments to reflect. This will help build your mindfulness practice. Resist the urge to form attachments to your thoughts - they are here to pass, not to stay.  Acknowledge them and send them on their way - like cars driving by or waves coming in and out from the sea. </p>
					<form
						onSubmit={e => this.handleSubmit(e)}
						className='reflection-form'
					>
						<div className='describe'>
							<label htmlFor='description'></label>
							<h2>Describe your session in a few words:</h2>
							<input
								type='text'
								name='description'
								id='description'
								value={description.value}
								onChange={e => this.updateDescription(e.target.value)}
								required
							/>
						</div>

						{description.touched && (
							<ValidationError message={descriptionError} />
						)}

						<div className='mood'>
							<h2>How is your mood?</h2>
						</div>
						<div
							className='radio'
							onChange={e => this.updateMood(e.target.value)}
						>
							<input
								type='radio'
								value='sad'
								name='mood'
								id='sad-face'
								required
							/>
							<label htmlFor='sad-face'>
								<FontAwesomeIcon
									icon={faFrown}
									size='2x'
									className='font-awesome'
								/>
							</label>
							<input type='radio' value='avg' name='mood' id='avg-face' />
							<label htmlFor='avg-face'>
								<FontAwesomeIcon
									className='font-awesome'
									icon={faMeh}
									size='2x'
								/>
							</label>
							<input type='radio' value='smiley' name='mood' id='smiley' />
							<label htmlFor='smiley'>
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
								Write down any thoughts that come to mind as you reflect on today's practice.
							</p>
							<textarea
								name='reflections'
								id='reflections'
								cols='40'
								rows='10'
								value={reflections.value}
								onChange={e => this.updateReflections(e.target.value)}
								required
							></textarea>

							{reflections.touched && (
								<ValidationError message={reflectionsError} />
							)}
						</div>
						<button type='submit'>Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Reflection;

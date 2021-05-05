import React from 'react';

class SignUp extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		alert(
			'This app is in beta testing. Click on Dashboard above to try it out!'
		);
		e.target.reset();
	};

	render() {
		return (
			<>
				<section className='signup-section'>
					<div className='signup-div'>
						<h1>Sign up for your free Reflect account</h1>
						<p>
							Your meditation journey starts here. Committing to 5 minutes a day{' '}
							<strong>will</strong> change your life.
						</p>
					</div>
				</section>
				<section className='signup-div'>
					<div className='form'>
						<form onSubmit={this.handleSubmit}>
						<label htmlFor='first-name'>First Name:</label>
						<input 
							type='text'
							name='first-name'
							id='first-name'
							placeholder='First Name'
							required
							aria-required
						/>
						<label htmlFor='first-name'>Last Name:</label>
						<input 
							type='text'
							name='last-name'
							id='last-name'
							placeholder='Last Name'
							required
							aria-required
						/>
							<label htmlFor='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								required
								aria-required
							/>
							<label htmlFor='password'>Password:</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='type your password here'
								required
								aria-required
							/>
							<button type='submit'>Sign Me Up!</button>
						</form>
					</div>
				</section>
			</>
		);
	}
}

export default SignUp;

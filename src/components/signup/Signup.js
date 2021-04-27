import React from 'react';

class SignUp extends React.Component {
	render() {
		return (
			<>
				<section class='signup-section'>
					<div class='signup-div'>
						<h1>Sign up for your free Reflect account</h1>
						<p>
							Your meditation journey starts here. Committing to as little as 3
							minutes a day <strong>will</strong> change your life.{' '}
						</p>
					</div>
				</section>
				<section class='signup-div'>
					<div class='form'>
						<form>
							<label for='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='type your email here'
							/>
							<label for='password'>Password:</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='type your password here'
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

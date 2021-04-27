import React from 'react';

class Login extends React.Component {
	render() {
		return (
			<section class='login'>
				<div class='login'>
					<h1>Sign in to your Reflect account</h1>
					<div class='form'>
						<form>
							<label for='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='type your email here'
                required
                aria-required
							/>
							<label for='password'>Password:</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='type your password here'
                required
                aria-required
							/>
							<button type='submit'>Sign In</button>
						</form>
					</div>
				</div>
			</section>
		);
	}
}

export default Login;

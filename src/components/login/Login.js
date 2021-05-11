import React from 'react';
import TokenService from '../../services/token-service';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}

	updateEmail = e => {
		this.setState({
			email: e.target.value,
		});
	};

	updatePassword = e => {
		this.setState({
			password: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		TokenService.saveAuthToken(TokenService.makeBasicAuthToken(email, password))
		console.log('login form submitted');
		console.log({ email, password });
		// alert(
		// 	'This app is in beta testing. Click on Dashboard above to try it out!'
		// );
		// e.target.reset();
	};
	render() {
		const { email, password } = this.state;
		return (
			<section className='login'>
				<div className='login'>
					<h1>Sign in to your Reflect account</h1>
					<div className='form'>
						<form onSubmit={this.handleSubmit}>
							<label htmlFor='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								value={email}
								onChange={this.updateEmail}
								required
								aria-required
							/>
							<label htmlFor='password'>Password:</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Password'
								value={password}
								onChange={this.updatePassword}
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

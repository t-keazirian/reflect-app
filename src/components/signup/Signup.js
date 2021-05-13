import React from 'react';
import ApiContext from '../../context/ApiContext';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import ValidationError from '../validation-error/ValidationError';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			error: null,
		};
	}

	static contextType = ApiContext;

	updateFirstName = e => {
		this.setState({
			first_name: e.target.value,
		});
	};

	updateLastName = e => {
		this.setState({
			last_name: e.target.value,
		});
	};

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
		const { first_name, last_name, email, password } = this.state;
		console.log(first_name, last_name, email, password);
		console.log('Sign Up Submitted');

		AuthApiService.postUser({ first_name, last_name, email, password })
			.then(res => {
				console.log(res);
				this.setState({
					first_name: '',
					last_name: '',
					email: '',
					password: '',
				});
				this.props.history.push('/dashboard');
				TokenService.getUserId();
				TokenService.saveUserId(res.id)
				TokenService.saveAuthToken(res.authToken);
			})
			.catch(err => {
				this.setState({
					error: err.error.message,
				});
				console.log(err.error.message);
			});
	};

	validateError = () => {
		const { error } = this.state;
		if (error) {
			console.log(error);
			return error;
		}
	};

	render() {
		const { first_name, last_name, email, password, error } = this.state;
		const validationError = this.validateError();

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
								value={first_name}
								onChange={this.updateFirstName}
								required
								aria-required
							/>
							<label htmlFor='first-name'>Last Name:</label>
							<input
								type='text'
								name='last-name'
								id='last-name'
								placeholder='Last Name'
								value={last_name}
								onChange={this.updateLastName}
								required
								aria-required
							/>
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
							<button type='submit'>Sign Me Up!</button>

							{error && <ValidationError message={validationError} />}
						</form>
					</div>
				</section>
			</>
		);
	}
}

export default SignUp;

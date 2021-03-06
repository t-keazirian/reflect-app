import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import ApiContext from '../../context/ApiContext';
import ValidationError from '../validation-error/ValidationError';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			error: null,
		};
	}

	static contextType = ApiContext;

	updateEmail = e => {
		this.setState({
			email: e.target.value.toLowerCase(),
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

		console.log('login form submitted');
		console.log(email, password);

		AuthApiService.postLogin({ email, password })

			.then(res => {
				console.log(res);
				this.setState({
					email: '',
					password: '',
				});
				TokenService.saveUserId(res.id);
				this.context.handleUserId(res.id);
				this.props.history.push('/dashboard');
			})
			.catch(err => {
				this.setState({
					error: err,
				});
				console.log(err);
			});
	};

	validateError = () => {
		const { error } = this.state;
		if (error) {
			return 'Incorrect email or password';
		}
	};

	render() {
		const { email, password, error } = this.state;
		const validationError = this.validateError();
		return (
			<section className='login'>
				<div className='login'>
					<h1 className='h1-sign-in'>Sign in to your Reflect account</h1>
					<div className='demo'>
						<h3>Demo Account:</h3>
						<p>Email: demo@email.com</p>
						<p>Password: Demo123!</p>
					</div>
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

							{error && <ValidationError message={validationError} />}

							<button type='submit' className='sign-in-btn'>
								Sign In
							</button>
						</form>
					</div>
					<Link to='/signup' className='new-user-link'>
						New user? Click here!
					</Link>
				</div>
			</section>
		);
	}
}

export default Login;

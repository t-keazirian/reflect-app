import React from 'react';

class Login extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		alert(
			'This app is in beta testing. Click on Dashboard above to try it out!'
		);
		e.target.reset();
	};
	render() {
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
								placeholder='type your email here'
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
							<button type='submit'>Sign In</button>
						</form>
					</div>
				</div>
			</section>
		);
	}
}

export default Login;

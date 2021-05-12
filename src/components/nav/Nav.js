import {
	faList,
	faSignInAlt,
	faSignOutAlt,
	faSpa,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../context/ApiContext';
import IdleService from '../../services/idle-service';
import TokenService from '../../services/token-service';

class Nav extends React.Component {
	static contextType = ApiContext;

	// need to implement and add Logout button
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		// this.context.clearCurrentUser()
		// this.context.clearReflections()
	};

	renderLogoutLink = () => {
		return (
			<Link className='login-link' to='/' onClick={this.handleLogoutClick}>
				<FontAwesomeIcon
					className='font-awesome'
					icon={faSignOutAlt}
					size='1x'
				/>
				Logout
			</Link>
		);
	};

	renderLoginLink = () => {
		return (
			<Link className='login-link' to='/login'>
				<FontAwesomeIcon
					className='font-awesome'
					icon={faSignInAlt}
					size='1x'
				/>
				Login
			</Link>
		);
	};

	// renderSignUpLink = () => {
	// 	return (
	// 		<Link className='signup-link' to='/signup'>
	// 					<FontAwesomeIcon
	// 						icon={faUserPlus}
	// 						className='font-awesome'
	// 						size='1x'
	// 					/>
	// 					Sign Up
	// 				</Link>
	// 	)
	// }

	render() {
		return (
			<header>
				<nav className='nav'>
					<Link className='homepage-link' to='/'>
						<FontAwesomeIcon icon={faSpa} size='1x' className='font-awesome' />
						Reflect
					</Link>
					<div className='nav'>
						<Link className='dashboard-link' to='/dashboard'>
							<FontAwesomeIcon
								className='font-awesome'
								icon={faList}
								size='1x'
							/>
							Dashboard
						</Link>
						{/* <Link className='login-link' to='/login'>
						<FontAwesomeIcon
							className='font-awesome'
							icon={faSignInAlt}
							size='1x'
						/>
						Login
					</Link> */}
						{TokenService.hasAuthToken()
							? this.renderLogoutLink()
							: this.renderLoginLink()}

						{/* <Link className='signup-link' to='/signup'>
						<FontAwesomeIcon
							icon={faUserPlus}
							className='font-awesome'
							size='1x'
						/>
						Sign Up
					</Link> */}
					</div>
				</nav>
			</header>
		);
	}
}

export default Nav;

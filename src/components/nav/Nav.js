import {
	faList,
	faSignInAlt,
	faSignOutAlt,
	faSpa,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import IdleService from '../../services/idle-service';
import TokenService from '../../services/token-service';

class Nav extends React.Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		TokenService.clearUserId();
		this.props.logoutUser();
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

	renderDashboard = () => {
		return (
			<Link className='dashboard-link' to='/dashboard'>
				<FontAwesomeIcon className='font-awesome' icon={faList} size='1x' />
				Dashboard
			</Link>
		);
	};

	render() {
		// const { auth } = this.props;
		return (
			<header>
				<nav className='nav'>
					<Link className='homepage-link' to='/'>
						<FontAwesomeIcon icon={faSpa} size='1x' className='font-awesome' />
						Reflect
					</Link>
					<div className='nav'>
						{/* <Link className='dashboard-link' to='/dashboard'>
							<FontAwesomeIcon
								className='font-awesome'
								icon={faList}
								size='1x'
							/>
							Dashboard
						</Link> */}
						{/* <Link className='login-link' to='/login'>
						<FontAwesomeIcon
							className='font-awesome'
							icon={faSignInAlt}
							size='1x'
						/>
						Login
					</Link> */}
						{TokenService.hasAuthToken() && this.renderDashboard()}

						{TokenService.hasAuthToken()
							? this.renderLogoutLink()
							: this.renderLoginLink()}
						{/* {auth ? this.renderLogoutLink() : this.renderLoginLink()} */}
					</div>
				</nav>
			</header>
		);
	}
}

export default Nav;

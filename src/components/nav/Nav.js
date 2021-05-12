import {
	faList,
	faSignInAlt,
	faSpa,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import TokenService from '../../services/token-service';

export default function Nav() {

	// need to implement and add Logout button 
	// const handleLogoutClick = () => {
	// 	TokenService.clearAuthToken()
	// }
	
	return (
		<header>
			<nav className='nav'>
				<Link className='homepage-link' to='/'>
					<FontAwesomeIcon icon={faSpa} size='1x' className='font-awesome' />
					Reflect
				</Link>
				<div className='nav'>
					<Link className='dashboard-link' to='/dashboard'>
						<FontAwesomeIcon className='font-awesome' icon={faList} size='1x' />
						Dashboard
					</Link>
					<Link className='login-link' to='/login'>
						<FontAwesomeIcon
							className='font-awesome'
							icon={faSignInAlt}
							size='1x'
						/>
						Login
					</Link>
					<Link className='signup-link' to='/signup'>
						<FontAwesomeIcon
							icon={faUserPlus}
							className='font-awesome'
							size='1x'
						/>
						Sign Up
					</Link>
				</div>
			</nav>
		</header>
	);
}

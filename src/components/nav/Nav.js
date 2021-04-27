import {
	faSignInAlt,
	faSpa,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<header>
			<nav className='nav'>
				<Link className='homepage-link' to='/'>
					<FontAwesomeIcon icon={faSpa} size='1x' className='font-awesome' />
					Reflect
				</Link>
				<div className='nav'>
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

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

export default function Footer() {
	return (
		<footer id='contact'>
			<div className='footer'>
				<div className='icons'>
					<a
						href='https://www.linkedin.com/in/taylor-keazirian/'
						target='_blank'
						className='footer-link'
						rel='noreferrer'
						aria-label='linkedin-link'
					>
						<i className='fab fa-linkedin fa-2x'></i>
						<FontAwesomeIcon
							className='font-awesome'
							icon={faLinkedin}
							size='2x'
						/>
					</a>

					<a
						href='https://github.com/t-keazirian'
						target='_blank'
						rel='noreferrer'
						aria-label='github-link'
					>
						<FontAwesomeIcon
							className='font-awesome'
							icon={faGithub}
							size='2x'
							
						/>
					</a>
				</div>
				<p className='p-footer'>
					Taylor Keazirian <FontAwesomeIcon icon={faCopyright} /> 2021
				</p>
			</div>
		</footer>
	);
}

import React from 'react';
import config from '../../config';
import ApiContext from '../../context/ApiContext';
import TokenService from '../../services/token-service';

class MoodSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			meditations: '',
		};
	}

	static contextType = ApiContext;

	updateSearch = search => {
		this.setState({
			search: search,
		});
	};

	handleSearchSubmit = e => {
		const user_id = TokenService.getUserId();
		e.preventDefault();
		const { search } = this.state;
		fetch(`${config.API_BASE_URL}/reflections/${user_id}?mood=${search}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(queriedMeditations => {
				console.log(queriedMeditations);
				this.context.handleSearch(queriedMeditations);
			});
			console.log('clicked');
	};

	handleReset = () => {
		const user_id = TokenService.getUserId();
		fetch(`${config.API_BASE_URL}/reflections/${user_id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(meditations => {
				this.setState({
					search: ''
				})
				this.context.handleSearch(meditations);
			})
	};

	render() {
		const { search } = this.state;
		return (
			<div className='search'>
				<form onSubmit={this.handleSearchSubmit}>
					<label htmlFor='search' className='search-label'>
						Search by Mood:
					</label>
					<select
						name='search'
						id='search'
						onChange={e => this.updateSearch(e.target.value)}
						value={search}
					>
						<option value=''>Select Mood</option>
						<option value='sad'>Sad</option>
						<option value='meh'>Meh</option>
						<option value='happy'>Happy</option>
					</select>
					<div className='search-btns'>
						<button type='submit'>Search</button>
						<button type='submit' onClick={this.handleReset}>
							Reset Search
						</button>
					</div>
				</form>

				{/* how to display the search results? */}
			</div>
		);
	}
}

export default MoodSearch;

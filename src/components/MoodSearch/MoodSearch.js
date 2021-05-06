import React from 'react';
import config from '../../config';
import ApiContext from '../../context/ApiContext';

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
		e.preventDefault();
		const { search } = this.state;
		fetch(`${config.API_BASE_URL}?mood=${search}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(queriedMeditations => {
				this.context.handleSearch(queriedMeditations);
			});
	};

	handleReset = () => {
		fetch(`${config.API_BASE_URL}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(meditations => {
				this.context.handleSearch(meditations);
			});
	};

	render() {
		const { search } = this.state;
		return (
			<div className='search'>
				<form onSubmit={this.handleSearchSubmit}>
					<label htmlFor='search' className='search-label'>Search by Mood:</label>
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

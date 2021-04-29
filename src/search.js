import React from 'react';
import config from './config';
import ApiContext from './context/ApiContext';

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
			.then(meditations => {
				this.setState({
					meditations: meditations,
				});
			});
	};

	render() {
		const { search, meditations } = this.state;
    console.log(meditations);
		return (
			<div className='search'>
				<form onSubmit={this.handleSearchSubmit}>
					<label htmlFor='search'>Search by Mood:</label>
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
					<button type='submit'>Search</button>
				</form>
        {/* how to display the search results? */}
			</div>
		);
	}
}

export default MoodSearch;

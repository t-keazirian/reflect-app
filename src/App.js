import React from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import LandingPage from './components/landing-page/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import { Route, Switch } from 'react-router';
import NotFound from './components/notfound/NotFound';
import SignUp from './components/signup/Signup';
import Login from './components/login/Login';
import MeditationDetail from './components/meditation-detail/MeditationDetail';
import Reflection from './components/reflections/Reflection';
import ApiContext from './context/ApiContext';
import Start from './components/start-meditation/Start';
import EditMeditation from './components/edit/EditMeditation';
import PrivateRoute from './components/Utils/PrivateRoute';
// import PublicRoute from './components/Utils/PublicRoute';

import TokenService from './services/token-service';
import IdleService from './services/idle-service';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			meditations: [],
			user_id: null,
			user_token: null,
		};
	}

	// componentDidMount() {
	// 	fetch(`${config.API_BASE_URL}/reflections/1`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'content-type': 'application/json',
	// 			authorization: `bearer ${TokenService.getAuthToken()}`,
	// 		},
	// 	})
	// 		.then(res => {
	// 			if (!res.ok) {
	// 				return res.json().then(error => Promise.reject(error));
	// 			}
	// 			return res.json();
	// 		})
	// 		.then(meditations => {
	// 			this.setState({
	// 				meditations: this.sortDatesDescending(meditations),
	// 			});
	// 		});
	// }

	componentWillUnmount() {
		IdleService.unRegisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}

	setMeditations = (meditations) => {
		this.setState({
			meditations: meditations
		})
	}

	clearMeditations = () => {
		this.setState({
			meditations: []
		})
	}

	handleDeleteMeditation = meditationId => {
		const newArray = this.state.meditations.filter(
			meditation => meditation.id !== meditationId
		);
		this.setState({
			meditations: newArray,
		});
	};

	handleAddMeditation = newMeditation => {
		console.log(newMeditation);
		this.setState({
			meditations: this.sortDatesDescending([
				...this.state.meditations,
				newMeditation,
			]),
		});
	};

	handleSearch = queriedReflections => {
		this.setState({
			meditations: queriedReflections,
		});
	};

	handleEditMeditation = updatedMeditation => {
		const newMeditationArray = this.state.meditations.map(meditation => {
			if (meditation.id === updatedMeditation.id) {
				meditation.description = updatedMeditation.description;
				meditation.current_mood = updatedMeditation.current_mood;
				meditation.notes = updatedMeditation.notes;
				meditation.date = updatedMeditation.date;
				meditation.minutes = updatedMeditation.minutes;
			}
			return meditation;
		});
		this.setState({
			meditations: newMeditationArray,
		});
	};

	handleUserId = user_id => {
		this.setState({
			user_id,
		});
	};

	render() {
		const contextValue = {
			meditations: this.state.meditations,
			user_id: this.state.user_id,
			user_token: this.state.user_token,
			deleteMeditation: this.handleDeleteMeditation,
			addMeditation: this.handleAddMeditation,
			editMeditation: this.handleEditMeditation,
			handleSearch: this.handleSearch,
			handleUserId: this.handleUserId,
			setMeditations: this.setMeditations
		};

		return (
			<ApiContext.Provider value={contextValue}>
				<>
					<Nav />
					<div className='app'>
						<Switch>
							<Route exact path='/' component={LandingPage} />
							<PrivateRoute path='/dashboard' component={Dashboard} />
							<Route path='/signup' component={SignUp} />
							<Route path='/login' component={Login} />
							<PrivateRoute path='/start' component={Start} />
							<PrivateRoute path='/reflect' component={Reflection} />
							<PrivateRoute path='/edit/:id' component={EditMeditation} />
							<PrivateRoute
								path='/meditation/:id'
								component={MeditationDetail}
							/>
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</>
			</ApiContext.Provider>
		);
	}
}

export default App;

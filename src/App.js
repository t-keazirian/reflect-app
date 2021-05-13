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
import sortDates from './components/Utils/sort-dates';
import TokenService from './services/token-service';
import IdleService from './services/idle-service';
import AuthApiService from './services/auth-api-service';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			meditations: [],
			user_id: null,
			auth_token: null,
		};
	}

	componentDidMount() {
		// logout a user when idle
		IdleService.setIdleCallback(this.logoutFromIdle);

		// if user is logged in
		if (TokenService.hasAuthToken()) {
			// tell idle service to register event listeners
			// event listeners fire when user is active
			// if user doesn't trigger event listeners, idleCallback is invoked (logout)
			IdleService.registerIdleTimerResets();

			// tell token service to read JWT, look at exp value and queue timeout before token expires
			TokenService.queueCallbackBeforeExpiry(() => {
				AuthApiService.postRefreshToken();
			});
		}
	}

	componentWillUnmount() {
		IdleService.unRegisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}

	logoutFromIdle = () => {
		// remove token from local localStorage
		TokenService.clearAuthToken();
		// remove queued calls to refresh endpoint
		TokenService.clearCallbackBeforeExpiry();
		// remove timeouts that auto logout when idle
		IdleService.unRegisterIdleResets();
		this.setState({
			auth: false,
		});
		this.forceUpdate();
	};

	setMeditations = meditations => {
		this.setState({
			meditations: sortDates(meditations),
		});
	};

	clearMeditations = () => {
		this.setState({
			meditations: [],
		});
	};

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
			meditations: sortDates([...this.state.meditations, newMeditation]),
		});
	};

	handleSearch = queriedReflections => {
		console.log(queriedReflections, this.state.meditations);
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

	logoutUser = () => {
		this.setState({
			auth_token: null,
			user_id: null,
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
			setMeditations: this.setMeditations,
		};

		return (
			<ApiContext.Provider value={contextValue}>
				<>
					<Nav logoutUser={this.logoutUser} />
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

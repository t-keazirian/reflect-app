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
import config from './config';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			meditations: [],
			signedIn: false,
		};
	}

	// once they submit form, set state signedIn to true

	componentDidMount() {
		fetch(`${config.API_BASE_URL}/reflections`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			},
		})
		.then(res => {
			if (!res.ok) {
				return res.json().then(error => Promise.reject(error))
			}
			return res.json()
		})
		.then(meditations => {
			this.setState({
				meditations: meditations
			})
		})
	}

	handleDeleteMeditation = meditationId => {
		const newArray = this.state.meditations.filter(
			meditation => meditation.id !== meditationId
		);
		console.log(newArray);
		this.setState({
			meditations: newArray,
		});

		console.log(this.state.meditations);
	};

	handleAddMeditation = newMeditation => {
		console.log(newMeditation);
		this.setState({
			meditations: [...this.state.meditations, newMeditation],
		});

		console.log(this.state.meditations);
	};

	render() {
		const contextValue = {
			meditations: this.state.meditations,
			deleteMeditation: this.handleDeleteMeditation,
			addMeditation: this.handleAddMeditation,
		};

		return (
			<ApiContext.Provider value={contextValue}>
				<>
					<Nav />
					<div className='app'>
						<Switch>
							<Route exact path='/' component={LandingPage} />
							<Route path='/dashboard' component={Dashboard} />
							<Route path='/signup' component={SignUp} />
							<Route path='/login' component={Login} />
							<Route path='/start' component={Start} />
							<Route path='/reflect' component={Reflection} />
							<Route path='/:id' component={MeditationDetail} />
							<Route component={NotFound} />
						</Switch>
						<Footer />
					</div>
				</>
			</ApiContext.Provider>
		);
	}
}

export default App;

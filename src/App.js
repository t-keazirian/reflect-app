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
import MeditationDetail from './components/indv-meditation/MeditationSummary';
import ApiContext from './context/ApiContext';
import store from './store';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			meditations: [],
		};
	}

	componentDidMount() {
		this.setState({
			meditations: store,
		});
	}

	handleDeleteMeditation = meditationId => {
		const newArray = this.state.goals.filter(
			meditation => meditation.id !== meditationId
		);
		this.setState({
			meditations: newArray,
		});
	};

	handleAddMeditation = newMeditation => {
		this.setState({
			meditations: [this.state.meditations, newMeditation],
		});
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

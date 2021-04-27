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
import ApiContext from './context/ApiContext';
import Start from './components/start-meditation/Start';
import meditations from './store';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			meditations: meditations,
			signedIn: false
		};
	}

	// once they submit form, set state signedIn to true

	// componentDidMount() {
	// 	this.setState({
	// 		meditations: store,
	// 	});
	// }

	handleDeleteMeditation = meditationId => {
		const newArray = this.state.meditations.filter(
			meditation => meditation.id !== meditationId
		);
		console.log(newArray);
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
			meditations: meditations,
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

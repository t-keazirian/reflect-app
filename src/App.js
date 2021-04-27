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

class App extends React.Component {
	render() {
		return (
			<>
				<Nav />
				<div className='app'>
					<Switch>
						<Route exact path='/' component={LandingPage} />
						<Route path='/dashboard' component={Dashboard} />
						<Route path='/signup' component={SignUp} />
						<Route path='/login' component={Login} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</div>
			</>
		);
	}
}

export default App;

import config from '../config';
import TokenService from './token-service';
import IdleService from './idle-service';

const AuthApiService = {
	postUser(user) {
		return fetch(`${config.API_BASE_URL}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		}).then(res => {
			if (!res.ok) {
				return res.json().then(error => Promise.reject(error));
			}
			return res.json();
		});
	},

	postLogin({email, password}) {
		return fetch(`${config.API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			// body: JSON.parse(JSON.stringify(email, password)),
			body: JSON.stringify({email, password})
		})
			.then(res => {
				console.log(email, password);
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(res => {
				// save token in local localStorage
				TokenService.saveAuthToken(res.authToken);
				IdleService.registerIdleTimerResets();
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});
				return res;
			});
	},

	postRefreshToken() {
		return fetch(`${config.API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => Promise.reject(error));
				}
				return res.json();
			})
			.then(res => {
				TokenService.saveAuthToken(res.authToken);
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});
				return res;
			})
			.catch(err => {
				console.log('refresh token request error');
				console.log(err);
			});
	},
};

export default AuthApiService;

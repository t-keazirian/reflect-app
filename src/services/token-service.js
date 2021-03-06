import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
	saveAuthToken(token) {
		window.localStorage.setItem(config.TOKEN_KEY, token);
	},

	saveUserId(user_id) {
		window.localStorage.setItem('user_id', user_id);
	},

	getUserId() {
		return window.localStorage.getItem('user_id');
	},

	getAuthToken() {
		return window.localStorage.getItem(config.TOKEN_KEY);
	},

	clearAuthToken() {
		console.log('clearing auth token');
		window.localStorage.removeItem(config.TOKEN_KEY);
	},

	clearUserId() {
		window.localStorage.removeItem('user_id')
	},

	hasAuthToken() {
		return !!TokenService.getAuthToken();
	},

	makeBasicAuthToken(email, password) {
		return window.btoa(`${email}:${password}`);
	},

	parseJwt(jwt) {
		return jwtDecode(jwt);
	},

	readJwtToken() {
		return TokenService.parseJwt(TokenService.getAuthToken());
	},

	_getMsUntilExpiry(payload) {
		return payload.exp * 1000 - Date.now();
	},

	queueCallbackBeforeExpiry(callback) {
		const msUntilExpiry = TokenService._getMsUntilExpiry(
			TokenService.readJwtToken()
		);

		_timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
	},

	clearCallbackBeforeExpiry() {
		clearTimeout(_timeoutId);
	},
};

export default TokenService;

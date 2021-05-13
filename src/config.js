const config = {
	TOKEN_KEY: 'reflections-client-auth-token',
	API_BASE_URL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8000/api'
			: 'https://damp-garden-53690.herokuapp.com/api',
};

export default config;

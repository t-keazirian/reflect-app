import React from 'react';

const ApiContext = React.createContext({
	meditations: [],
	user_id: null,
	user_token: null,
	deleteMeditation: () => {},
	addMeditation: () => {},
	editMeditation: () => {},
	handleSearch: () => {},
	handleUserId: () => {},
	setMeditations: () => {},
	clearUserId: () => {},
	clearAuthToken: () => {},
});

export default ApiContext;

import React from 'react';

const ApiContext = React.createContext({
	meditations: [],
	deleteMeditation: () => {},
	addMeditation: () => {},
	editMeditation: () => {},
	handleSearch: () => {},
	handleUserId: null,
	handleUserToken: null
});

export default ApiContext;

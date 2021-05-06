import React from 'react';

const ApiContext = React.createContext({
	meditations: [],
	deleteMeditation: () => {},
	addMeditation: () => {},
	editMeditation: () => {},
	handleSearch: () => {},
});

export default ApiContext;

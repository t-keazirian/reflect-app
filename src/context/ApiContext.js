import React from 'react';

const ApiContext = React.createContext({
	meditations: [],
	deleteMeditation: () => {},
	addMeditation: () => {},
	editMeditation: () => {}
});

export default ApiContext;

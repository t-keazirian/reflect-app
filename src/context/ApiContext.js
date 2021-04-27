import React from 'react';

const ApiContext = React.createContext({
	meditations: [],
	deleteMeditation: () => {},
	addMeditation: () => {},
});

export default ApiContext;

import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './Redux/reducers/index';

const store = createStore (
	reducers, // Reducers
	{}, // Estado inicial
	applyMiddleware(reduxThunk)
);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);

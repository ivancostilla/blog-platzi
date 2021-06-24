
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';

const store = createStore (
	reducers, // Reducers
	{}, // Estado inicial
	applyMiddleware(reduxThunk)
);
export default store;
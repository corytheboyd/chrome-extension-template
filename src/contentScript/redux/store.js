import { createStore } from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

// TODO remove when I get remote devtools working.
global.store = store;

export default store;

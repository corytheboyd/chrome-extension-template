import { createStore, combineReducers } from 'redux';
import localReducer from './contexts/local/reducers';
import globalReducer from './contexts/global/reducers';

const rootReducer = combineReducers({
  local: localReducer,
  global: globalReducer,
});

const store = createStore(rootReducer);

// TODO remove when I get remote devtools working.
global.store = store;

export default store;

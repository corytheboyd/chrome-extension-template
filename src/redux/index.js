import { combineReducers } from 'redux';

import localReducer from './contexts/local/reducers';
import globalReducer from './contexts/global/reducers';

const rootReducer = combineReducers({
  local: localReducer,
  global: globalReducer,
});

export default rootReducer;

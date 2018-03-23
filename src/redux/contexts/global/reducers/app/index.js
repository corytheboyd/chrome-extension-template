import initialState from './initialState';
import { types } from '../../actions/app/index';

export default function exampleReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_IS_UPDATE_AVAILABLE: {
      return {
        ...state,
        isUpdateAvailable: true,
      };
    }

    default: {
      return state;
    }
  }
}

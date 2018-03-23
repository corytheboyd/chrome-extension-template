import initialState from './initialState';
import { types } from '../../actions/app/index';

export default function exampleReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

import initialState from './initialState';
import { types } from '../../actions/app';

export default function exampleReducer(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE: {
      return {
        ...state,
        initialized: true,
      };
    }

    default: {
      return state;
    }
  }
}

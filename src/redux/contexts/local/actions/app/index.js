import createActionTypes from '../../../../../lib/create-action-types';

export const types = createActionTypes({
  SET_NAME: null,
}, 'LOCAL_CONTEXT', 'ACTIONS', 'APP');

export const setName = name => ({
  type: types.SET_NAME,
  payload: name,
});

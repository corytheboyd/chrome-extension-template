import createActionTypes from '../../../../../lib/create-action-types';

export const types = createActionTypes({
  SET_IS_UPDATE_AVAILABLE: null,
}, 'GLOBAL', 'ACTIONS', 'EXAMPLE');

export const setIsUpdateAvailable = value => ({
  type: types.INITIALIZE,
  payload: value,
});

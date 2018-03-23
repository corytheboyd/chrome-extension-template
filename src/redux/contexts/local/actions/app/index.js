import createActionTypes from '../../../../../lib/create-action-types';

export const types = createActionTypes({
  INITIALIZE: null,
}, 'LOCAL_CONTEXT', 'ACTIONS', 'EXAMPLE');

export const initialize = () => ({
  type: types.INITIALIZE,
});

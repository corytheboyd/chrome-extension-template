import createActionTypes from '../../../../../lib/create-action-types';

export const types = createActionTypes({
  INITIALIZE: null,
}, 'LOCAL_CONTEXT', 'ACTIONS', 'EXAMPLE');

console.log('types', types);

export const initialize = () => ({
  type: types.INITIALIZE,
});

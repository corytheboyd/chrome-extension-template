import createActionTypes from '../../../../lib/create-action-types';

export const types = createActionTypes({
  INITIALIZE: null,
}, 'ACTIONS', 'EXAMPLE');

console.log('types', types);

export const initialize = () => ({
  type: types.INITIALIZE,
});

import { createSelector } from 'reselect';

import root from '../root';

export const isInitialized = createSelector(
  root,
  root => root.app.isInitialized,
);

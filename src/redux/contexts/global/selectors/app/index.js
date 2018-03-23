import { createSelector } from 'reselect';

import root from '../root';

export const isUpdateAvailable = createSelector(
  root,
  root => root.app.isUpdateAvailable,
);

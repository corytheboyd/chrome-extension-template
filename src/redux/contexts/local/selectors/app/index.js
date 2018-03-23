import { createSelector } from 'reselect';

import root from '../root';

export const name = createSelector(
  root,
  root => root.app.name,
);

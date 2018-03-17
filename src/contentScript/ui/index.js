import React from 'react';
import { render } from 'react-dom';

import App from './App';

export function initialize () {
  console.log('initialize UI');

  render(<App />, document.body);
}

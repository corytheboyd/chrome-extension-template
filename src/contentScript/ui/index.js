import React from 'react';
import { render } from 'react-dom';
import ReactFrame from 'react-frame-component';

import Root from './Root';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

export function initialize () {
  console.log('initialize UI');

  render(
    (
      <ReactFrame>
        <Root />
      </ReactFrame>
    ),
    rootNode,
  );
}

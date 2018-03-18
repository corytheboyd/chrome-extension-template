import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactFrame from 'react-frame-component';

import store from '../redux/store'
import Root from './Root';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

export function initialize () {
  console.log('initialize UI');

  render(
    (
      <ReactFrame
        frameBorder="0"
        scrolling="no"
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
        }}
      >
        <Provider store={store}>
          <Root />
        </Provider>
      </ReactFrame>
    ),
    rootNode,
  );
}

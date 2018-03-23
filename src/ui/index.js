import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactFrame from 'react-frame-component';

import Root from './Root/index';

/**
 * Bootstrap the UI. Must provide a DOM note to render into, and a Redux Store instance.
 *
 * @param {HTMLDivElement} rootNode Where you want the UI to be injected.
 * @param {Store} store Instance of a Redux Store.
 *
 * @return {void}
 * */
export function initialize (rootNode, store) {
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

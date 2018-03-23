import { createStore, applyMiddleware } from 'redux';

import PortManager from './PortManager';
import { initialize as initializeUi } from '../ui';
import rootReducer from '../redux';

/**
 * Watch for Global effects. Forward them to the background for processing.
 * */
const middleware = store => next => action => {
  if (action.meta && action.meta.source === 'GLOBAL') {

  }

  next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(middleware)
);
global.store = store;

const portManager = new PortManager();
portManager.registerWatchers();
portManager.onMessage((message) => {
  console.info('MESSAGE', message);
});

global.portManager = portManager;

// Build UI container div and add to main page document.
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

initializeUi(rootNode, store);

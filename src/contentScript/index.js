import { createStore, applyMiddleware } from 'redux';

import PortManager from './PortManager';
import { initialize as initializeUi } from '../ui';
import rootReducer from '../redux';

const portManager = new PortManager();
portManager.registerWatchers();

const store = createStore(
  rootReducer,
  applyMiddleware(
    portManager.buildReduxMiddleware(),
  ),
);

// Message received from background
portManager.onMessage((message) => {
  console.info('MESSAGE FROM BACKGROUND', message);

  // TODO multiplex message. Assuming it's a FSA meant for Redux right now
  store.dispatch(message);
});


global.store = store;
global.portManager = portManager;

// Build UI container div and add to main page document.
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

initializeUi(rootNode, store);

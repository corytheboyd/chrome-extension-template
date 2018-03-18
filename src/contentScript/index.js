import { initialize as initializeUi } from './ui';

initializeUi();

const { PORT_NAME } = require('../constants');
let port = null;

const onPortDisconnectHandler = (port) => {
  console.debug('DISCONNECTED FROM BACKGROUND', port);
  port = null;
};

const onConnectHandler = (newPort) => {
  if (newPort.name !== PORT_NAME) return;

  newPort.onDisconnect.addListener(onPortDisconnectHandler);
  port = newPort;
}

chrome.runtime.onConnect.addListener(onConnectHandler);

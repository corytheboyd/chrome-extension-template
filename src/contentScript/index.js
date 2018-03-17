console.log('Hello, content script', new Date());

const { PORT_NAME } = require('../constants');
let port = null;
global.port = port;

const onPortDisconnectHandler = (port) => {
  console.debug('DISCONNECTED FROM BACKGROUND', port);
  port = null;
};

const onConnectHandler = (newPort) => {
  if (newPort.name !== PORT_NAME) return;

  newPort.onDisconnect.addListener(onPortDisconnectHandler);

  console.debug('CONNECTED TO BACKGROUND', newPort);
  port = newPort;
}

chrome.runtime.onConnect.addListener(onConnectHandler);

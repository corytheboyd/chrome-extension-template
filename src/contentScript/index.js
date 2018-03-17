console.log('Hello, content script', new Date());

const { PORT_NAME } = require('../constants');
let port = null;
global.port = port;

const onConnectHandler = (newPort) => {
  if (newPort.name !== PORT_NAME) return;

  console.debug('CONNECTED TO BACKGROUND', newPort);
  port = newPort;
}

chrome.runtime.onConnect.addListener(onConnectHandler);

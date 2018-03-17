const createDebugNotification = (event, details = null) => {
  console.debug(event, details);

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/groove.png',
    title: 'Chrome Runtime Event',
    message: `${event} - details: ${JSON.stringify(details)}`,
  });
};

// Runtime event handlers
const onStartupHandler = () => {
  createDebugNotification('onStartup');
};

const onInstalledHandler = (details) => {
  createDebugNotification('onInstalled', details);
};

const onSuspendHandler = () => {
  createDebugNotification('onSuspend');
};

const onSuspendCanceledHandler = () => {
  createDebugNotification('onSuspendCanceled');
};

const onUpdateAvailableHandler = (details) => {
  createDebugNotification('onUpdateAvailable', details);
};

const onRestartRequiredHandler = (details) => {
  createDebugNotification('onRestartRequired', details);
};

// Register runtime event listeners
chrome.runtime.onStartup.addListener(onStartupHandler);
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.runtime.onSuspend.addListener(onSuspendHandler);
chrome.runtime.onSuspendCanceled.addListener(onSuspendCanceledHandler);
chrome.runtime.onUpdateAvailable.addListener(onUpdateAvailableHandler);
chrome.runtime.onRestartRequired.addListener(onRestartRequiredHandler);

console.debug('Hello, world!', new Date());

// Content script connections
const { PORT_NAME, CHROME_TABS_CHANGE_INFO } = require('../constants');
const ports = {};
global.ports = ports;

const onTabRemovedHandler = (tabId) => {
  console.debug('TAB CLOSED', tabId);

  const port = ports[tabId];
  port.disconnect();
  delete ports[tabId];
};

const onTabUpdatedHandler = (tabId, changeInfo) => {
  if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.LOADING) {
    console.debug('TAB LOAD START', tabId);
  }

  if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.COMPLETE) {
    console.debug('TAB LOAD COMPLETE', tabId);

    const port = chrome.tabs.connect(tabId, { name: PORT_NAME, frameId: 0 });
    ports[port.sender.tab.id] = port;
  }
};

chrome.tabs.onRemoved.addListener(onTabRemovedHandler);
chrome.tabs.onUpdated.addListener(onTabUpdatedHandler);

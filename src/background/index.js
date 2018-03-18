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

// Content script connections
import { PORT_NAME, CHROME_TABS_CHANGE_INFO } from '../constants';

const ports = {};

const disconnectAndRemovePortForTabId = (tabId) => {
  const port = ports[tabId];
  port.disconnect();
  delete ports[tabId];
};

const isTabConnected = (tabId) => {
  return Object.keys(ports).includes(tabId.toString());
};

const onTabRemovedHandler = (tabId) => {
  if (!isTabConnected(tabId)) return;

  disconnectAndRemovePortForTabId(tabId);
};

const onTabUpdatedHandler = (tabId, changeInfo) => {
  if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.LOADING) {
    // If the tab is in ports and the tab update is starting, the tab was reloaded. Disconnect the
    // old port and then remove it from state.
    if (isTabConnected(tabId)) {
      disconnectAndRemovePortForTabId(tabId);
    }
  }

  if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.COMPLETE) {
    ports[tabId] =
      window.chrome.tabs.connect(tabId, { name: PORT_NAME, frameId: 0 });
  }
};

chrome.tabs.onRemoved.addListener(onTabRemovedHandler);
chrome.tabs.onUpdated.addListener(onTabUpdatedHandler);

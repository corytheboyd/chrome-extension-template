import { CHROME_TABS_CHANGE_INFO, PORT_NAME } from '../../constants';

export default class TabManager {
  /**
   * @param {PortManager} portManager
   * */
  constructor(portManager) {
    this.portManager = portManager;
  }

  /**
   * @param {string} tabId
   *
   * @return {void}
   * */
  _handleTabRemoved = (tabId) => {
    this.portManager.unregister(tabId);
  };

  /**
   * @param {string} tabId
   * @param {object} changeInfo
   *
   * @return {void}
   * */
  _handleTabUpdated = (tabId, changeInfo) => {
    if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.LOADING) {
      // If the tab is in ports and the tab update is starting, the tab was reloaded. Disconnect the
      // old port and then remove it from state.
      if (this.portManager.isRegistered(tabId)) {
        this.portManager.unregister(tabId);
      }
    }

    if (changeInfo.status === CHROME_TABS_CHANGE_INFO.STATUS.COMPLETE) {
      const port = chrome.tabs.connect(tabId, { name: PORT_NAME, frameId: 0 });

      this.portManager.register(tabId, port);
    }
  };

  /**
   * @return {void}
   * */
  registerWatchers() {
    chrome.tabs.onRemoved.addListener(this._handleTabRemoved);
    chrome.tabs.onUpdated.addListener(this._handleTabUpdated);
  }

  /**
   * @return {void}
   * */
  unregisterWatchers() {
    chrome.tabs.onRemoved.removeListener(this._handleTabRemoved);
    chrome.tabs.onUpdated.removeListener(this._handleTabUpdated);
  }
}

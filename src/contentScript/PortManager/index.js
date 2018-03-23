import { PORT_NAME } from '../../constants';

export default class PortManager {
  constructor() {
    this.port = null;
    this.messageHandler = () => {};
  }

  _onPortDisconnect = () => {
    this.port = null;
  };

  _onPortMessage = (message) => {
    this.messageHandler.call(null, message);
  };

  _registerPortWatchers = () => {
    this.port.onDisconnect.addListener(this._onPortDisconnect);
    this.port.onMessage.addListener(this._onPortMessage);
  };

  _unregisterPortWatchers = () => {
    this.port.onDisconnect.removeListener(this._onPortDisconnect);
  };

  _handleConnect = (port) => {
    if (port.name !== PORT_NAME) return;

    this.port = port;

    this._registerPortWatchers();
  };

  /**
   * @return {void}
   * */
  registerWatchers() {
    chrome.runtime.onConnect.addListener(this._handleConnect);
  }

  /**
   * @return {void}
   * */
  unregisterWatchers() {
    chrome.runtime.onConnect.removeListener(this._handleConnect);
  }

  /**
   * @param {function} handler
   *
   * @return {void}
   * */
  onMessage(handler) {
    this.messageHandler = handler;
  }

  /**
   * @return {function}
   * */
  buildReduxMiddleware() {
    return store => next => action => {
      // Forward to background
      if (this.port) {
        this.port.postMessage(action);
      }

      next(action);
    };
  }
}

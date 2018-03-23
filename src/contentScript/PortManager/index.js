import { PORT_NAME } from '../../constants';

export default class PortManager {
  constructor() {
    this.port = null;
  }

  _onPortDisconnect = () => {
    console.info('port disconnected');

    this.port = null;
  };

  _registerPortWatchers = () => {
    this.port.onDisconnect.addListener(this._onPortDisconnect);
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
}

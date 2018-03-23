import Repository from './Repository';

export {
  Repository,
};

export default class PortManager {
  constructor(repository) {
    this.repository = repository;
  }

  _onPortMessage = (message) => {
    console.log('PORT MESSAGE', message);
  };

  _registerPortListeners = (port) => {
    port.onMessage.addListener(this._onPortMessage);
  };

  _unregisterPortListeners = (port) => {
    port.onMessage.removeListener(this._onPortMessage);
  };

  /**
   * @param {string} tabId
   * @param {Port} port Chrome Port object
   *
   * @return {void}
   * */
  register(tabId, port) {
    this.repository.set(tabId, port);

    this._registerPortListeners(port);
  }

  /**
   * @param {string} tabId
   *
   * @return {void}
   * */
  unregister(tabId) {
    const port = this.repository.get(tabId);

    this._unregisterPortListeners(port);
    port.disconnect();

    this.repository.delete(tabId);
  }

  /**
   * @param {string} tabId
   *
   * @return {boolean}
   * */
  isRegistered(tabId) {
    return this.repository.has(tabId);
  }
}

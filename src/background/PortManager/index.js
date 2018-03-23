import Repository from './Repository';

export {
  Repository,
};

export default class PortManager {
  /**
   * @param {Repository} repository
   * @param {ActionHandler} actionHandler
   * */
  constructor(repository, actionHandler) {
    this.repository = repository;
    this.actionHandler = actionHandler;
  }

  _onPortMessage = (message) => {
    // TODO multiplex message. Assuming it's a FSA meant for Redux right now
    this.actionHandler.process(message);
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

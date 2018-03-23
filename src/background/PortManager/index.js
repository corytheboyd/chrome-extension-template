import Repository from './Repository';

export default class PortManager {
  constructor(repository = new Repository()) {
    this.repository = repository;
  }

  /**
   * @param {string} tabId
   * @param {Port} port Chrome Port object
   *
   * @return {void}
   * */
  register(tabId, port) {
    this.repository.set(tabId, port);
  }

  /**
   * @param {string} tabId
   *
   * @return {void}
   * */
  unregister(tabId) {
    const port = this.repository.get(tabId);
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

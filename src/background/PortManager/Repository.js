import { isUndefined } from 'lodash-es';

export default class Repository {
  constructor() {
    this.store = new Map();
  }

  /**
   * @param {string} key
   * @param {*} value
   *
   * @return {void}
   * */
  set(key, value) {
    this.store.set(key, value);
  }

  /**
   * @param {string} key
   *
   * @return {*}
   * */
  get(key) {
    const value = this.store.get(key);

    if (isUndefined(value)) {
      throw new Error('Key does not exist in store');
    }

    return value;
  }

  /**
   * @param {string} key
   *
   * @return {*}
   * */
  delete(key) {
    if (!this.store.has(key)) {
      throw new Error('Key does not exist in store');
    }

    this.store.delete(key);
  }

  /**
   * @param {string} key
   *
   * @return {boolean}
   * */
  has(key) {
    return this.store.has(key);
  }
}

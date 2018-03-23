export default class ActionHandler {
  constructor() {}

  /**
   * @param {object} state
   * @param {object} action
   *
   * @return {void}
   * */
  process(state, action) {
    console.info('state', state);
    console.info('action', action);

    // TODO the world is your oyster from here. Things we will need:
    // - perhaps limit to ONLY global actions for dispatch. they will be processed in the local Redux reducer
    // - when new content scripts connect, we need a way to set the default global state
    // - on second though, maybe global state SHOULD NOTE live in local content scripts... otherwise there is no one
    //   source of truth
    // - try to keep this library agnostic. no reason to force redux-saga on people. also, I am not sure if I like
    //   redux-saga anymore to being with
  }
}

# Chrome Extension Template

An amazing place to start building a Chrome extension that renders UI elements into arbitrary web pages.

Highlights:
- Build views with React and Material UI
    - Everything is rendered into an `iframe` to avoid style collisions with web pages being rendered into. Simply write the code you want and it will work.
- Manage state with Redux
    - There are two levels of state management available:
        - Global state: applies to all instances of the application
        - Local state: applies only to the instance of the application in the current tab.

## TODO

- [ ] ensure resiliency of connection between content script and backgroubnd
    - still want to investigate the idea of some sort of "process" abstraction that requires the registering of teardown functions or something
- [ ] redux devtools
- [ ] react devtools
- [ ] global redux state
    - how does it mesh with local state? perhaps just combine reducers into `global` and `local`  at the top.
        - but then do they share the same store instance? how?
- [ ] side-effect management
    - maybe redux-saga... but put way more work into it than you have before
- [ ] backend integration ready
    - come up with nice utility for interacting with JSON API backends. axios and maybe some top-level management of requests

## Redux

- Contains all of the Redux code: actions, reducers, selectors, etc.
- Exports the `Store` instance to be used with the `react-redux` `Provider` component.

### Contexts

By default, there are two contexts: global, and local.

#### Global context

Responsible for building and changing state that is inherited by all instances of the UI.

Example use cases:
- There is an update available, show a message in all client instances

#### Local context

Responsible for building and changing state that is local to a single instance of the UI.

Example use cases:
- Ephemeral UI state, like form field data

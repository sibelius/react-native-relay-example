# React Native + Relay

This is a sample repository that shows how to integrate React Native with Relay

It is connecting to this boilerplate code [graphql-dataloader-boilerplate](https://github.com/sibelius/graphql-dataloader-boilerplate)

## Description
- data folder contains schema(.json/.graphql) of your backend graphql server, it will be used by Relay to compile your Relay.QL queries to code.
- plugins folder has babelRelayPlugin configuration, that tells to Relay with schema.json it should use to compile Relay.QL queries

.babelrc for Relay
```json
{
    "presets": [
        "react-native"
    ],
    "plugins": [
        "./plugins/babelRelayPlugin"
    ],
}
```

### RelayStore.js
It is a custom Relay.Store that enables you to change your Network Layer. For instance, when you want to set the user token.

- Usage:
```js
RelayStore.reset(
  new Relay.DefaultNetworkLayer('http://localhost:5000/graphql')
);
```

### RelayUtils.js
Based on https://gist.github.com/janicduplessis/f513032eb37cdde5d050d9ce8cf0b92a by @janicduplessis
Provides a very handy function to create a Relay.Renderer container to fetch data from Relay

- Usage:
```jsx
import { createRenderer } from './RelayUtils'
export default createRenderer(RelayApp, {
  queries: ViewerQuery,
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
  },
});
```

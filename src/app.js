import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ViewerQuery from './ViewerQuery';
import { createRenderer } from './RelayUtils';
import RelayStore from './RelayStore';

RelayStore.reset(
  new Relay.DefaultNetworkLayer('http://localhost:5000/graphql')
);

class RelayApp extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text>User Length: {this.props.viewer.users.edges.length}</Text>
      </View>
    );
  }
}

// Create a Relay.Renderer container
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

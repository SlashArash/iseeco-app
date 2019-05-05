import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from '../../navigation/AppNavigator';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Root;

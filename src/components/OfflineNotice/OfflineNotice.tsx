import React, { PureComponent } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import StyledText from '../StyledText';
import messages from '../../lib/messages';
import NetInfo from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');

class OfflineNotice extends PureComponent {
  state = {
    isConnected: false,
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isConnected });
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={styles.offlineContainer}>
          <StyledText style={styles.offlineText}>
            {messages.noInternetConnection}
          </StyledText>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
  },
  offlineText: { color: '#fff' },
});

export default OfflineNotice;

import * as React from 'react';
import { Image, View, Alert } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import messages from '../../lib/messages';
import { xmpp } from '../../lib/XMPP';
import IStore from '../../types/IStore';
import IDevices from '../../types/IDevices';
import IDevice from '../../types/IDevice';

import styles from './styles';
import StyledText from '../StyledText';
import Button from '../Button';

interface IStateToProps {
  connected: boolean;
  devices: IDevices;
}

type IComponentProps = IStateToProps;

class StatusBox extends React.PureComponent<IComponentProps> {
  handleReconnect = () => {
    xmpp.login();
  };

  render(): React.ReactNode {
    const { devices, connected } = this.props;
    const activeDevices = Object.values(devices).reduce(
      (sum: number, deviceMap: { [status: string]: IDevice }) => {
        Object.values(deviceMap).forEach((device: IDevice) => {
          if (device.active === 'on') {
            sum += 1;
          }
        });
        return sum;
      },
      0
    );
    return (
      <View
        style={[
          styles.container,
          connected ? styles.connectedContainer : styles.disconnectedContainer,
        ]}
      >
        <Image
          source={require(`../../../assets/images/light.png`)}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <View style={styles.logoContainer}>
            <StyledText style={[styles.mainText, styles.lightColor]}>
              {messages.smartHomeSystem}
            </StyledText>
            <Image
              source={require(`../../../assets/images/iseeco.png`)}
              style={styles.logo}
            />
          </View>
          {connected ? (
            <StyledText style={styles.lightColor}>
              {messages.activeSensors}: {activeDevices}
            </StyledText>
          ) : (
            <Button onPress={this.handleReconnect} title={messages.reconnect} />
            // <TouchableOpacity
            // style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
            //   onPress={this.handleReconnect}
            // >
            //   <StyledText style={styles.lightColor}>
            //     ✗ {messages.disconnectedFromServer} -{' '}
            //     <StyledText style={styles.reconnect}>
            //       {messages.reconnect}
            //     </StyledText>
            //   </StyledText>
            // </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateToProps, undefined, IStore> = (
  state: IStore
) => {
  const devices = state.devices;
  const connected = state.app.connected;

  return { connected, devices };
};

export default connect(mapStateToProps)(StatusBox);

import * as React from 'react';
import { Image, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import messages from '../../lib/messages';
import { xmpp } from '../../lib/XMPP';
import IStore from '../../types/IStore';
import IDevices from '../../types/IDevices';
import IDevice from '../../types/IDevice';
import { IConnection } from '../../types/IConnection';

import styles from './styles';
import StyledText from '../StyledText';
import Button from '../Button';

interface IStateToProps {
  connection: IConnection;
  devices: IDevices;
}

type IComponentProps = IStateToProps;

class StatusBox extends React.PureComponent<IComponentProps> {
  handleReconnect = () => {
    xmpp.login();
  };

  render(): React.ReactNode {
    const { connection, devices } = this.props;
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
          !connection.local && !connection.internet
            ? styles.disconnectedContainer
            : styles.connectedContainer,
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
          {!connection.local && !connection.internet ? (
            <Button onPress={this.handleReconnect} title={messages.reconnect} />
          ) : (
            <StyledText style={styles.lightColor}>
              {messages.activeSensors}: {activeDevices}
            </StyledText>
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
  const connection = state.connection;

  return { devices, connection };
};

export default connect(mapStateToProps)(StatusBox);

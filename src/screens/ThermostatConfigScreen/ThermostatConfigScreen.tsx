import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { connect } from 'react-redux';
import produce from 'immer';
import { Dispatch } from 'redux';

import messages from '../../lib/messages';
import { xmpp } from '../../lib/XMPP';
import IStore from '../../types/IStore';
import { updateDevice } from '../../store/devices/actions';

import styles from './styles';
import Cooling from '../../components/Cooling';
import IDevice from '../../types/IDevice';
import FanSpeed from '../../components/FanSpeed';
import Power from '../../components/Power';
import Temperature from '../../components/Temperature';
import { changeThermostatState } from '../../lib/deviceUtils';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  dispatch: Dispatch;
}

interface IStateToProps {
  device: IDevice;
}

type IComponentProps = IOwnProps & IStateToProps;

class ThermostatConfigScreen extends React.PureComponent<IComponentProps> {
  static navigationOptions = ({ navigation }) => {
    const device = navigation.getParam('device');
    const title = `${messages.config} ${device.name}`;
    return {
      title,
    };
  };

  timer: any;

  handleChangePower = (active: 'on' | 'off', fanSpeed: number) => {
    const device = produce(this.props.device, (draft) => {
      draft.active = active;
      draft.fanSpeed = fanSpeed;
    });
    const message = changeThermostatState(device);
    xmpp.updateDeviceStatus(message);
  };

  handleChangeTemperature = (newValue: number) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const device = produce(this.props.device, (draft) => {
      draft.toTemperature = newValue;
    });
    const message = changeThermostatState(device);
    const msgParts = message.split('-');
    const deviceNumber = msgParts[2];
    this.props.dispatch(
      updateDevice(
        deviceNumber,
        msgParts[3],
        msgParts[4],
        msgParts[5],
        msgParts[6],
        msgParts[7]
      )
    );

    this.timer = setTimeout(() => xmpp.updateDeviceStatus(message), 1000);
  };

  handleChangeFanSpeed = (newSpeed: number) => {
    const device = produce(this.props.device, (draft) => {
      draft.fanSpeed = newSpeed;
    });
    const message = changeThermostatState(device);
    xmpp.updateDeviceStatus(message);
  };

  handleChangeCooling = (newValue: boolean) => {
    const device = produce(this.props.device, (draft) => {
      draft.cooling = newValue;
    });
    const message = changeThermostatState(device);
    xmpp.updateDeviceStatus(message);
  };

  render() {
    const { device } = this.props;

    return (
      <View style={styles.mainWrapper}>
        <View style={styles.buttonWrapper}>
          <Cooling
            active={!!device.cooling}
            onChange={this.handleChangeCooling}
          />
          <FanSpeed
            speed={device.fanSpeed as number}
            onChange={this.handleChangeFanSpeed}
          />
        </View>
        <View>
          <Text style={styles.currentTemp}>{device.temperature} °C</Text>
        </View>
        <Temperature
          currentTemperature={device.temperature as number}
          toTemperature={device.toTemperature as number}
          onChange={this.handleChangeTemperature}
        />
        <Power
          active={device.active}
          fanSpeed={device.fanSpeed as number}
          onChange={this.handleChangePower}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: IStore, props: IComponentProps) => {
  const routeDevice: IDevice = props.navigation.getParam('device');
  const device = state.devices[routeDevice.number][routeDevice.status];
  return { device };
};

export default connect(mapStateToProps)(ThermostatConfigScreen);

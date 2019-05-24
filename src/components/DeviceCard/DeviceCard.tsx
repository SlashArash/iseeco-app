import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import IDevice from '../../types/IDevice';
import mapDeviceType from '../../lib/mapDeviceType';

import styles from './styles';
import StyledText from '../StyledText';

const bulbActive = require(`../../../assets/images/icons/bulb-active.png`);
const bulb = require(`../../../assets/images/icons/bulb-dark.png`);
const windowActive = require(`../../../assets/images/icons/window-active.png`);
const window = require(`../../../assets/images/icons/window-dark.png`);
const airConditionerActive = require(`../../../assets/images/icons/air-conditioner-active.png`);
const airConditioner = require(`../../../assets/images/icons/air-conditioner-dark.png`);
const thermostatActive = require(`../../../assets/images/icons/thermostat-active.png`);
const thermostat = require(`../../../assets/images/icons/thermostat-dark.png`);
const dancingLightActive = require(`../../../assets/images/icons/dancing-light-active.png`);
const dancingLight = require(`../../../assets/images/icons/dancing-light-dark.png`);
const chandelierActive = require(`../../../assets/images/icons/chandelier-active.png`);
const chandelier = require(`../../../assets/images/icons/chandelier-dark.png`);
const socketActive = require(`../../../assets/images/icons/socket-active.png`);
const socket = require(`../../../assets/images/icons/socket-dark.png`);
const fanActive = require(`../../../assets/images/icons/fan-active.png`);
const fan = require(`../../../assets/images/icons/fan-dark.png`);
const elevatorActive = require(`../../../assets/images/icons/elevator-active.png`);
const elevator = require(`../../../assets/images/icons/elevator-dark.png`);
const lockActive = require(`../../../assets/images/icons/lock-active.png`);
const lock = require(`../../../assets/images/icons/lock-dark.png`);
const musicActive = require(`../../../assets/images/icons/music-active.png`);
const music = require(`../../../assets/images/icons/music-dark.png`);
const fountainActive = require(`../../../assets/images/icons/fountain-active.png`);
const fountain = require(`../../../assets/images/icons/fountain-dark.png`);
const starActive = require(`../../../assets/images/icons/star-active.png`);
const star = require(`../../../assets/images/icons/star-dark.png`);

interface IComponentProps {
  device: IDevice;
  onPressOnDevice: (device: IDevice) => void;
}

class DeviceCard extends React.PureComponent<IComponentProps> {
  handlePressOnCard = () => {
    this.props.onPressOnDevice(this.props.device);
  };

  getIcon = (device: IDevice) => {
    const deviceType = mapDeviceType(device.type);
    let icon = bulb;
    if (deviceType === 'curtain') {
      icon = device.active === 'on' ? windowActive : window;
    } else if (deviceType === 'thermostat') {
      if (device.iconnumber === '2') {
        icon = device.active === 'on' ? thermostatActive : thermostat;
      } else {
        icon = device.active === 'on' ? airConditionerActive : airConditioner;
      }
    } else if (deviceType === 'lamp') {
      if (device.iconnumber === '1') {
        icon = device.active === 'on' ? bulbActive : bulb;
      } else if (device.iconnumber === '2') {
        // dancing light
        icon = device.active === 'on' ? dancingLightActive : dancingLight;
      } else if (device.iconnumber === '3') {
        // chandelier
        icon = device.active === 'on' ? chandelierActive : chandelier;
      } else if (device.iconnumber === '4') {
        // socket
        icon = device.active === 'on' ? socketActive : socket;
      } else if (device.iconnumber === '5') {
        // fan
        icon = device.active === 'on' ? fanActive : fan;
      } else if (device.iconnumber === '6') {
        // elevator
        icon = device.active === 'on' ? elevatorActive : elevator;
      } else if (device.iconnumber === '7') {
        // lock
        icon = device.active === 'on' ? lockActive : lock;
      } else if (device.iconnumber === '8') {
        // music
        icon = device.active === 'on' ? musicActive : music;
      } else if (device.iconnumber === '9') {
        // fountain
        icon = device.active === 'on' ? fountainActive : fountain;
      } else if (device.iconnumber === '10') {
        // light box
        icon = device.active === 'on' ? starActive : star;
      }
    }
    return icon;
  };

  render() {
    const { device } = this.props;
    const icon = this.getIcon(device);

    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={this.handlePressOnCard}>
          <View style={styles.cardBody}>
            <Image source={icon} style={styles.icon} />
            <StyledText>{device.name}</StyledText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeviceCard;

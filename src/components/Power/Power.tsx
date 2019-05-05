import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import StyledText from '../StyledText';
import messages from '../../lib/messages';

const snow = require('../../../assets/images/icons/power-dark.png');
const snowActive = require('../../../assets/images/icons/power-active.png');

interface IComponentProps {
  active: 'on' | 'off';
  fanSpeed: number;
  onChange: (active: 'on' | 'off', fanSpeed: number) => void;
}

class Power extends React.PureComponent<IComponentProps> {
  handleChangePower = () => {
    let newActive: 'on' | 'off' = 'off';
    let newFanSpeed: number = 1;
    if (this.props.active === 'off' && this.props.fanSpeed > 0) {
      // on to active
      newActive = 'on';
      newFanSpeed = 1;
    } else if (this.props.active === 'off' && this.props.fanSpeed === 0) {
      // off to on
      newActive = 'off';
      newFanSpeed = 1;
    } else if (this.props.active === 'on') {
      // auto to off
      newActive = 'off';
      newFanSpeed = 0;
    }
    this.props.onChange(newActive, newFanSpeed);
  };
  render() {
    const { active, fanSpeed } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.icon, active === 'on' && styles.auto]}
          onPress={this.handleChangePower}
        >
          {active === 'on' && <StyledText style={styles.text}>AUTO</StyledText>}
          {active === 'off' && fanSpeed > 0 && (
            <Image source={snowActive} style={styles.image} />
          )}
          {active === 'off' && fanSpeed === 0 && (
            <Image source={snow} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Power;

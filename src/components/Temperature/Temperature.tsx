import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';
import StyledText from '../StyledText';

interface IComponentProps {
  currentTemperature: number;
  toTemperature: number;
  onChange: (number) => void;
}

class Temperature extends React.PureComponent<IComponentProps> {
  handleChangeValue = (type: 'decrease' | 'increase') => () => {
    const { toTemperature } = this.props;
    if (type === 'decrease') {
      this.props.onChange(toTemperature - 1);
    } else if (type === 'increase') {
      this.props.onChange(toTemperature + 1);
    }
  };

  render() {
    const { toTemperature } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.handleChangeValue('decrease')}>
          <StyledText style={styles.arrowNumbers}>
            {toTemperature - 1}
          </StyledText>
        </TouchableOpacity>
        <StyledText style={styles.mainNumber}>{toTemperature}</StyledText>
        <TouchableOpacity onPress={this.handleChangeValue('increase')}>
          <StyledText style={styles.arrowNumbers}>
            {toTemperature + 1}
          </StyledText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Temperature;

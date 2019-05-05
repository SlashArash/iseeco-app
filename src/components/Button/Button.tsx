import React, { StatelessComponent } from 'react';
import {
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';

import { colorTypes } from '../../types/types';

import { colors } from '../../constants/Theme';
import StyledText from '../StyledText';

interface IComponentProps {
  color?: colorTypes;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    marginVertical: 8,
    padding: 8,
    backgroundColor: colors.navyBlue,
    ...Platform.select({
      ios: {
        shadowColor: colors.smoke,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

class Button extends React.PureComponent<IComponentProps> {
  handlePress = (ev: NativeSyntheticEvent<NativeTouchEvent>) => {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onPress();
    }
  };

  render() {
    const { color, loading, style, title } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        style={[
          styles.button,
          color && { backgroundColor: colors[color] },
          style,
        ]}
      >
        <StyledText style={styles.text}>
          {loading ? 'loading...' : title}
        </StyledText>
      </TouchableOpacity>
    );
  }
}

export default Button;

import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import styles from './styles';
import { colors } from '../../constants/Theme';
import StyledText from '../StyledText';

interface IComponentProps {
  onPress: () => void;
  image?: ImageSourcePropType;
  text?: string;
  icon?: string;
  label?: string;
}

class CircleButton extends React.PureComponent<IComponentProps> {
  handlePress = () => {
    this.props.onPress();
  };
  render() {
    const { image, text, icon, label } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.circle} onPress={this.handlePress}>
          {image && <Image source={image} style={styles.image} />}
          {text && <StyledText>{text}</StyledText>}
          {icon && <Feather name={icon} size={30} color={colors.black} />}
        </TouchableOpacity>
        <StyledText>{label}</StyledText>
      </View>
    );
  }
}

export default CircleButton;

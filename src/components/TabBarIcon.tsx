import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { colors } from '../constants/Theme';

interface IComponentProps {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<IComponentProps> {
  render() {
    return (
      <Feather
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? colors.blue : colors.smoke}
      />
    );
  }
}

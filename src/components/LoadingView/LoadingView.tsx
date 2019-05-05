import React from 'react';
import { View } from 'react-native';

import messages from '../../lib/messages';

import StyledText from '../StyledText';

interface IComponentProps {
  message?: string;
}

const LoadingView: React.StatelessComponent<IComponentProps> = ({
  message,
}) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <StyledText>{message ? message : messages.loading}</StyledText>
  </View>
);

export default LoadingView;

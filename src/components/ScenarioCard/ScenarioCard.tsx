import React from 'react';
import {
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  View,
} from 'react-native';

import IScenario from '../../types/IScenario';

import styles from './styles';
import StyledText from '../StyledText';

interface IComponentProps {
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
  scenario: IScenario;
}

const requireIcon = (scenario: IScenario, active: boolean) => {
  let icon = active
    ? require(`../../../assets/images/icons/unknown-light.png`)
    : require(`../../../assets/images/icons/unknown-dark.png`);
  if (scenario.id === 1) {
    // normal
    icon = active
      ? require(`../../../assets/images/icons/weather-light.png`)
      : require(`../../../assets/images/icons/weather-dark.png`);
  } else if (scenario.id === 2) {
    // guest
    icon = active
      ? require(`../../../assets/images/icons/food-light.png`)
      : require(`../../../assets/images/icons/food-dark.png`);
  } else if (scenario.id === 3) {
    // sleep
    icon = active
      ? require(`../../../assets/images/icons/night-light.png`)
      : require(`../../../assets/images/icons/night-dark.png`);
  } else if (scenario.id === 4) {
    // cinema
    icon = active
      ? require(`../../../assets/images/icons/cinema-light.png`)
      : require(`../../../assets/images/icons/cinema-dark.png`);
  } else if (scenario.id === 5) {
    // exit
    icon = active
      ? require(`../../../assets/images/icons/exit-light.png`)
      : require(`../../../assets/images/icons/exit-dark.png`);
  } else if (scenario.id === 6) {
    // travel
    icon = active
      ? require(`../../../assets/images/icons/flight-light.png`)
      : require(`../../../assets/images/icons/flight-dark.png`);
  }
  return icon;
};

const ScenarioCard: React.StatelessComponent<IComponentProps> = ({
  active,
  onPress,
  scenario,
}) => {
  const icon = requireIcon(scenario, active);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, active && styles.active]}
    >
      <View style={styles.cardBody}>
        <Image source={icon} style={styles.icon} />
        <StyledText style={active && styles.activeText}>
          {scenario.title}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default ScenarioCard;

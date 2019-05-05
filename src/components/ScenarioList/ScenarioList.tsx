import React from 'react';
import { GestureResponderEvent, ScrollView, View } from 'react-native';

import IScenario from '../../types/IScenario';
import messages from '../../lib/messages';

import ListTitle from '../ListTitle';
import ScenarioCard from '../ScenarioCard';

interface IComponentProps {
  currentScenario: number;
  onPress: (scenarioId: number) => (event: GestureResponderEvent) => void;
}

const scenarios: IScenario[] = [
  { id: 1, title: messages.normal },
  { id: 2, title: messages.guest },
  { id: 3, title: messages.sleep },
  { id: 4, title: messages.cinema },
  { id: 5, title: messages.exit },
  { id: 6, title: messages.travel },
];

const ScenarioList: React.StatelessComponent<IComponentProps> = ({
  currentScenario,
  onPress,
}) => (
  <View>
    <ListTitle>{messages.status}</ListTitle>
    <ScrollView
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={10}
      snapToAlignment="end"
    >
      {scenarios.map((scenario: IScenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          active={Number(currentScenario) === scenario.id}
          onPress={onPress(scenario.id)}
        />
      ))}
    </ScrollView>
  </View>
);

export default ScenarioList;

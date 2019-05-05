import * as React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { colors } from '../constants/Theme';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import PlaceScreen from '../screens/PlaceScreen';
import ThermostatConfigScreen from '../screens/ThermostatConfigScreen';
import CurtainConfigScreen from '../screens/CurtainConfigScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Place: PlaceScreen,
    ThermostatConfig: ThermostatConfigScreen,
    CurtainConfig: CurtainConfigScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: colors.blue,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
      },
    },
  }
);

HomeStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
  },
  tabBarIcon: ({ focused }: any) => (
    <TabBarIcon focused={focused} name={'home'} />
  ),
};

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    SingIn: SignInScreen,
  },
  {
    initialRouteName: 'Settings',
  }
);

SettingsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
  },
  tabBarIcon: ({ focused }: any) => (
    <TabBarIcon focused={focused} name={'settings'} />
  ),
};

export default createBottomTabNavigator({
  Home: HomeStack,
  Settings: SettingsStack,
});

import React, { PureComponent } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import IStore from '../../types/IStore';
// import { xmpp } from '../../lib/XMPP';

interface IStateToProps {
  ip: string | null;
  password: string | null;
  serverName: string | null;
  userName: string | null;
}

interface IOwnProps {
  dispatch: Dispatch;
}

type IComponentProps = NavigationInjectedProps & IOwnProps & IStateToProps;

class AuthLoadingScreen extends PureComponent<IComponentProps> {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const { password, userName } = this.props;
    const isLoggedIn = userName && password;

    // This will switch to the App screen or Auth screen and this loading
    this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IStore> = (
  state
) => {
  const ip = state.app.ip;
  const password = state.app.password;
  const serverName = state.app.serverName;
  const userName = state.app.userName;
  return {
    ip,
    password,
    serverName,
    userName,
  };
};

export default connect(mapStateToProps)(AuthLoadingScreen);

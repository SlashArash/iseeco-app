import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../store/app/actions';
import { xmpp } from '../../lib/XMPP';
import messages from '../../lib/messages';

import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import StyledText from '../../components/StyledText';

interface IComponentProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  dispatch: Dispatch;
}

interface IComponentStates {
  text: string;
}

class SettingsScreen extends React.Component<
  IComponentProps,
  IComponentStates
> {
  static navigationOptions = {
    title: messages.settings,
  };

  signOutAsync = async () => {
    xmpp.disconnect();
    this.props.dispatch(logout());
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <Wrapper>
        <StyledText>
          this app created by ISEE co. it let you to control your smart home!
        </StyledText>

        <Button title={messages.signOut} onPress={this.signOutAsync} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { userName: state.userName };
};

export default connect(mapStateToProps)(SettingsScreen);

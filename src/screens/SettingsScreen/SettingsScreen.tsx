import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

import { logout, login } from '../../store/app/actions';
import { xmpp } from '../../lib/XMPP';
import messages from '../../lib/messages';

import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import StyledText from '../../components/StyledText';
import IStore from '../../types/IStore';
import { Formik } from 'formik';
import Input from '../../components/Input';
import { Alert, View } from 'react-native';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  dispatch: Dispatch;
}

interface IStateToProps {
  ip: string | null;
  password: string | null;
  serverName: string | null;
  userName: string | null;
}

type IComponentProps = IOwnProps & IStateToProps;

interface IComponentStates {
  loading: boolean;
}

interface ILoginFormProps {
  server: string;
  user: string;
  password: string;
  ip: string;
}

class SettingsScreen extends React.Component<
  IComponentProps,
  IComponentStates
> {
  static navigationOptions = {
    title: messages.settings,
  };

  state = {
    loading: false,
  };

  signOutAsync = async () => {
    xmpp.disconnect();
    this.props.dispatch(logout());
    this.props.navigation.navigate('SignIn');
  };

  handleSubmit = async (values: ILoginFormProps) => {
    const { user, password, ip, server } = values;
    if ((user.trim() !== '' && password.trim() !== '') || ip.trim() !== '') {
      xmpp.disconnect();
      xmpp
        .login(
          (ip, pass, server, user) => {
            this.props.dispatch(login(ip, pass, server, user));
            this.setState({ loading: false });
            this.props.navigation.navigate('Home');
          },
          this.props.dispatch,
          ip,
          password,
          server.toLowerCase(),
          user.toLowerCase()
        )
        .catch((message) => {
          if (message) {
            Alert.alert('Login Faild', message);
          }
          this.setState({ loading: false });
        });
    } else {
      Alert.alert('Validation', 'Please enter valid credential');
      this.setState({ loading: false });
    }
  };

  handleFolan = (onSubmit) => () => {
    onSubmit();
    this.setState({ loading: true });
  };

  render() {
    const { serverName, userName, password, ip } = this.props;
    const formInitialValues: ILoginFormProps = {
      server: serverName || '',
      user: userName || '',
      password: password || '',
      ip: ip || '',
    };
    return (
      <Wrapper>
        <StyledText>
          this app created by ISEE co. it let you to control your smart home!
        </StyledText>
        <Formik initialValues={formInitialValues} onSubmit={this.handleSubmit}>
          {(props) => (
            <View>
              <Input
                onChangeText={props.handleChange('server')}
                onBlur={props.handleBlur('server')}
                value={props.values.server}
                placeholder={messages.serverName}
                returnKeyType={'next'}
              />
              <Input
                onChangeText={props.handleChange('user')}
                onBlur={props.handleBlur('user')}
                value={props.values.user}
                placeholder={messages.userName}
                returnKeyType={'next'}
              />
              <Input
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                placeholder={messages.password}
                returnKeyType={'next'}
                secureTextEntry={true}
              />
              <Input
                onChangeText={props.handleChange('ip')}
                onBlur={props.handleBlur('ip')}
                value={props.values.ip}
                placeholder={messages.ipOfLocalServer}
              />
              <Button
                onPress={this.handleFolan(props.handleSubmit)}
                title={messages.save}
                color={'blue'}
                loading={this.state.loading}
              />
            </View>
          )}
        </Formik>
        <Button
          title={messages.signOut}
          onPress={this.signOutAsync}
          color="red"
        />
      </Wrapper>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IStore> = (
  state
) => {
  const ip = state.app.ip;
  const serverName = state.app.serverName;
  const userName = state.app.userName;
  const password = state.app.password;

  return { ip, serverName, userName, password };
};

export default connect(mapStateToProps)(SettingsScreen);

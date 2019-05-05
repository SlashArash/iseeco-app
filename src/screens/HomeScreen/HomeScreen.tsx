import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { xmpp } from '../../lib/XMPP';
import IStore from '../../types/IStore';
import IPlaces from '../../types/IPlaces';
import { login } from '../../store/app/actions';

import styles from './styles';
import StatusBox from '../../components/StatusBox';
import ScenarioList from '../../components/ScenarioList';
import PlaceList from '../../components/PlaceList';
import Wrapper from '../../components/Wrapper';
import LoadingView from '../../components/LoadingView';
import messages from '../../lib/messages';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  dispatch: Dispatch;
}

interface IStateToProps {
  ip: string | null;
  password: string | null;
  places: IPlaces;
  serverName: string | null;
  userName: string | null;
  scenario: number;
}

type IComponentProps = IOwnProps & IStateToProps;

interface IComponentStates {
  loading: boolean;
}

class HomeScreen extends React.Component<IComponentProps, IComponentStates> {
  static navigationOptions = {
    header: null,
  };
  state: IComponentStates = {
    loading: true,
  };

  componentDidMount = async () => {
    if (!xmpp.isLogged()) {
      const { ip, password, serverName, userName, dispatch } = this.props;
      xmpp
        .login(
          (ip, pass, server, user) => {
            dispatch(login(ip, pass, server, user));
          },
          dispatch,
          ip,
          password,
          serverName,
          userName
        )
        .then(() => {
          this.getData();
        });
    } else {
      this.getData();
    }
  };

  getData = () => {
    xmpp.getPlaces();
    this.setState({ loading: false });
  };

  handleSelectScenario = (scenarioId: number) => () => {
    const msg = scenarioId.toString();
    xmpp.updateScenario(msg);
  };

  handlePressOnAPlace = (placeId: string) => () => {
    this.props.navigation.navigate('Place', { placeId });
  };

  render() {
    if (this.state.loading) {
      return <LoadingView message={messages.informationLoading} />;
    }
    return (
      <Wrapper>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <StatusBox />
          <View style={styles.body}>
            <ScenarioList
              currentScenario={this.props.scenario}
              onPress={this.handleSelectScenario}
            />
            <PlaceList
              places={this.props.places}
              onPressOnAPlace={this.handlePressOnAPlace}
            />
            <Text style={styles.getStartedText}>ISee Co.</Text>
          </View>
        </ScrollView>
      </Wrapper>
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
  const places = state.places;
  const scenario = state.app.scenario;

  return { ip, password, serverName, userName, places, scenario };
};

export default connect(mapStateToProps)(HomeScreen);

import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { connect } from 'react-redux';

import IDevice from '../../types/IDevice';
import IStore from '../../types/IStore';
import messages from '../../lib/messages';

import CircleButton from '../../components/CircleButton';
import { xmpp } from '../../lib/XMPP';
import { changeCurtainState } from '../../lib/deviceUtils';

interface IOwnProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface IStateToProps {
  device: IDevice;
}

type IComponentProps = IOwnProps & IStateToProps;

class CurtainConfigScreen extends React.PureComponent<IComponentProps> {
  static navigationOptions = ({ navigation }) => {
    const device = navigation.getParam('device');
    const title = `${messages.config} ${device.name}`;
    return {
      title,
    };
  };

  handleChangeState = (state: 'open' | 'pause' | 'close') => () => {
    const device: IDevice = this.props.navigation.getParam('device');
    const msg = changeCurtainState(device, state);

    if (msg.length > 0) {
      xmpp.updateDeviceStatus(msg);
    }
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          flexGrow: 1,
        }}
      >
        <CircleButton
          onPress={this.handleChangeState('open')}
          icon="arrow-up"
          label={messages.open}
        />
        <CircleButton
          onPress={this.handleChangeState('pause')}
          icon="pause"
          label={messages.pause}
        />
        <CircleButton
          onPress={this.handleChangeState('close')}
          icon="arrow-down"
          label={messages.close}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: IStore, props: IComponentProps) => {
  const routeDevice: IDevice = props.navigation.getParam('device');
  const device = state.devices[routeDevice.number][routeDevice.status];
  return { device };
};

export default connect(mapStateToProps)(CurtainConfigScreen);

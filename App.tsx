import React from 'react';
import { Provider } from 'react-redux';
import XMPP from 'react-native-xmpp';
import { PersistGate } from 'redux-persist/lib/integration/react';

(global as any).XMPP = XMPP;

import { persistor, store } from './src/store/configureStore';

import Root from './src/components/Root';
import LoadingView from './src/components/LoadingView';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

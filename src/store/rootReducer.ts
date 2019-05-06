import { combineReducers } from 'redux';

import AppReducer from './app/reducer';
import PlacesReducer from './places/reducer';
import DevicesReducer from './devices/reducer';
import ConnectionReducer from './connection/reducer';

export default combineReducers({
  app: AppReducer,
  places: PlacesReducer,
  devices: DevicesReducer,
  connection: ConnectionReducer,
});

import { produce } from 'immer';

import IApp from '../../types/IApp';
import { AppActions, AppActionTypes } from '../../types/AppActions';

const initialState: IApp = {
  ip: null,
  lastUpdateTime: null,
  password: null,
  serverName: null,
  userName: null,
  scenario: 1,
  connected: false,
};

const AppReducer = (state: IApp = initialState, action: AppActions) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AppActionTypes.LOGIN:
        draft.ip = action.ip;
        draft.serverName = action.serverName;
        draft.userName = action.userName;
        draft.password = action.password;
        break;
      case AppActionTypes.LOGOUT:
        draft.ip = null;
        draft.serverName = null;
        draft.userName = null;
        draft.password = null;
        break;
      case AppActionTypes.UPDATE_TIME:
        draft.lastUpdateTime = action.lastUpdateTime;
        break;
      case AppActionTypes.UPDATE_SCENARIO:
        draft.scenario = action.scenarioId;
        break;
      case AppActionTypes.SET_CONNECTION_STATUS:
        draft.connected = action.connected;
    }
  });

export default AppReducer;

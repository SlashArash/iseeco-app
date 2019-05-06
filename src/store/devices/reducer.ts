import { produce } from 'immer';

import IDevices from '../../types/IDevices';
import { DevicesActions, DevicesActionTypes } from '../../types/DevicesActions';
import { PlacesActionTypes, PlacesActions } from '../../types/PlacesActions';
import mapDeviceType from '../../lib/mapDeviceType';

const initialState: IDevices = {};

const DevicesReducer = (
  state: IDevices = initialState,
  action: DevicesActions | PlacesActions
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PlacesActionTypes.ADD_SEVERAL_PLACES:
        Object.values(action.devices).forEach((device) => {
          draft[device.number] = {
            ...draft[device.number],
            [device.status]: device,
          };
        });
        break;
      case DevicesActionTypes.UPDATE_STATUS:
        const device = draft[action.deviceNumber]['A'];
        const deviceType = mapDeviceType(device.type);
        if (deviceType === 'lamp') {
          if (action.part3 === '1') {
            draft[action.deviceNumber]['A'].active = 'on';
          } else if (action.part3 === '0') {
            draft[action.deviceNumber]['A'].active = 'off';
          }
          if (draft[action.deviceNumber]['B']) {
            if (action.part4 === '1') {
              draft[action.deviceNumber]['B'].active = 'on';
            } else if (action.part4 === '0') {
              draft[action.deviceNumber]['B'].active = 'off';
            }
          }
        } else if (deviceType === 'thermostat') {
          draft[action.deviceNumber]['A'].fanSpeed = Number(action.part3);
          draft[action.deviceNumber]['A'].active =
            action.part4 === '1' ? 'on' : 'off';
          draft[action.deviceNumber]['A'].temperature = Number(action.part5);
          draft[action.deviceNumber]['A'].toTemperature = Number(action.part6);
          draft[action.deviceNumber]['A'].cooling = action.part7 === '1';
        }
        break;
    }
  });

export default DevicesReducer;

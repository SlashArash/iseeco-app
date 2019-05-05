import { deviceType } from '../types/types';

const mapDeviceType = (
  deviceType: deviceType
): 'lamp' | 'thermostat' | 'curtain' | undefined => {
  if (deviceType === '16') {
    return 'curtain';
  } else if (deviceType === '2') {
    return 'lamp';
  } else if (deviceType === '1') {
    return 'thermostat';
  }
  return;
};

export default mapDeviceType;

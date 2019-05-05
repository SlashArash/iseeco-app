import IDevice from '../types/IDevice';

export const changeLampState = (lamp: IDevice): string => {
  const newA = lamp.status === 'A' ? (lamp.active === 'on' ? '0' : '1') : '2';
  const newB = lamp.status === 'B' ? (lamp.active === 'on' ? '0' : '1') : '2';
  return `K-V-${lamp.number}-${newA}-${newB}-48-48-0-0`;
};

export const changeThermostatState = (thermostat: IDevice): string => {
  const cooling = thermostat.cooling ? 1 : 0;
  const active = thermostat.active === 'on' ? 1 : 0;
  return `K-V-${thermostat.number}-${thermostat.fanSpeed}-${active}-${
    thermostat.temperature
  }-${thermostat.toTemperature}-${cooling}-0`;
};

export const changeCurtainState = (
  curtain: IDevice,
  state: 'open' | 'pause' | 'close'
): string => {
  let stateNumber = '0-0'; // pause
  if (state === 'open') {
    stateNumber = '2-1';
  } else if (state === 'close') {
    stateNumber = '1-2';
  }
  return `K-V-${curtain.number}-${stateNumber}-48-48-0-0`;
};

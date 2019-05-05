import XMPP from 'react-native-xmpp';
import { Dispatch } from 'redux';
import Sockets from 'react-native-sockets';
import { DeviceEventEmitter } from 'react-native';

import {
  updateTime,
  updateScenario,
  setConnectionStatus,
} from '../store/app/actions';
import { updateDevice } from '../store/devices/actions';
import { addPlaces } from '../store/places/actions';
import getXmlMessage from './getXmlMessage';
import xmlToJson from './xmlToJson';
import { normalizePlaces } from './storeUtils';
import { decodeUTF8 } from '../lib/text';
import IDevice from '../types/IDevice';

interface IXMPP {
  connect: () => void;
  isConnected: () => boolean;
  isLogged: () => boolean;
  disconnect: () => void;
  dispatch: Dispatch | null;
  getPlaces: () => void;
  getDeviceStatus: (deviceNumber: string) => void;
  lastUpdateTime: string | null;
  localIp: string | null;
  login: (
    loginListener?: (
      localIp: string | null,
      password: string | null,
      serverName: string | null,
      userName: string | null
    ) => void,
    dispatch?: Dispatch,
    localIp?: string | null,
    password?: string | null,
    serverName?: string | null,
    userName?: string | null
  ) => Promise<any>;
  loginListener: any;
  message: (msg: string) => void;
  password: string | null;
  packMessage: (message: string, type: string) => string;
  serverName: string | null;
  updateDeviceStatus: (msg: string) => void;
  updateScenario: (msg: string) => void;
  userName: string | null;
}

XMPP.trustHosts(['jabb.im']);

export const xmpp: IXMPP = {
  localIp: null,
  password: null,
  serverName: null,
  userName: null,
  lastUpdateTime: null,
  dispatch: null,
  loginListener: null,
  isConnected: () => {
    if (xmpp.localIp) {
      return false;
    }
    return XMPP.isConnected;
  },
  connect: () => {
    if (!xmpp.isConnected()) {
      if (xmpp.localIp) {
        const socketConfig = {
          address: xmpp.localIp, //ip address of server
          port: 8081, //port of socket server
          reconnect: true, //OPTIONAL (default false): auto-reconnect on lost server
          reconnectDelay: 500, //OPTIONAL (default 500ms): how often to try to auto-reconnect
          maxReconnectAttempts: 10, //OPTIONAL (default infinity): how many time to attemp to auto-reconnect
        };
        Sockets.startClient(socketConfig);
      } else {
        const { userName, password } = xmpp;
        XMPP.connect(`${userName}@jabb.im`, password);
      }
    }
  },
  isLogged: () => {
    if (xmpp.localIp) {
      return true;
    }
    return XMPP.isLogged;
  },
  login: (
    loginListener?: (localIp, password, serverName, userName) => void,
    dispatch?: Dispatch,
    localIp: string | null | undefined = null,
    password: string | null | undefined = null,
    serverName: string | null | undefined = null,
    userName: string | null | undefined = null
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      xmpp.dispatch = dispatch || xmpp.dispatch;
      xmpp.localIp = localIp || xmpp.localIp;
      xmpp.password = password || xmpp.password;
      xmpp.serverName = serverName || xmpp.serverName;
      xmpp.userName = userName || xmpp.userName;
      xmpp.loginListener = loginListener || xmpp.loginListener;
      if (xmpp.dispatch) {
        if (xmpp.localIp) {
          xmpp.connect();
          //on connected
          DeviceEventEmitter.addListener('socketClient_connected', () => {
            console.debug('CONNECTED!');
            xmpp.dispatch!(setConnectionStatus(true));
            xmpp.loginListener(
              xmpp.localIp,
              xmpp.password,
              xmpp.serverName,
              xmpp.userName
            );
            return resolve();
          });
          //on error
          DeviceEventEmitter.addListener('socketClient_error', (data) => {
            console.debug('connection error:' + data.error);
            return reject(data.error);
          });
          //on new message
          DeviceEventEmitter.addListener('socketClient_data', (payload) => {
            const parts = decodeUTF8(payload.data).split('&');
            const msg = parts[5];
            const msgType = parts[4];
            xmpp.lastUpdateTime = parts[3];
            if (parts.length === 7 || parts[0] === 'server') {
              if (msgType === '0') {
                const xml = getXmlMessage(msg);
                if (xml) {
                  const json = xmlToJson(xml);
                  const scenarioId =
                    json.settings.currentscenario['@attributes'].value;
                  const normalizedData = normalizePlaces(json.settings
                    .places as any);
                  normalizedData[1].forEach((device: IDevice) => {
                    xmpp.getDeviceStatus(device.number);
                  });
                  xmpp.dispatch!(addPlaces(normalizedData));
                  xmpp.dispatch!(updateTime(xmpp.lastUpdateTime));
                  xmpp.dispatch!(updateScenario(Number(scenarioId)));
                }
              } else if (msgType === '2') {
                const msgParts = msg.split('-');
                const deviceNumber = msgParts[2];
                xmpp.dispatch!(
                  updateDevice(
                    deviceNumber,
                    msgParts[3],
                    msgParts[4],
                    msgParts[5],
                    msgParts[6],
                    msgParts[7]
                  )
                );
              } else if (msgType === '1') {
                xmpp.dispatch!(updateScenario(Number(msg)));
              }
            }
          });
          //on client closed
          DeviceEventEmitter.addListener('socketClient_closed', (data) => {
            console.debug('DISCONNECTED!');
            xmpp.dispatch!(setConnectionStatus(false));
          });
        } else {
          if (!xmpp.isLogged()) {
            xmpp.connect();
            XMPP.on('connect', () => {
              console.debug('CONNECTED!');
              xmpp.dispatch!(setConnectionStatus(true));
            });
            XMPP.on('disconnect', () => {
              console.debug('DISCONNECTED!');
              xmpp.dispatch!(setConnectionStatus(false));
            });
            XMPP.on('error', (message) => {
              console.debug('ERROR:' + message);
              return reject();
            });
            XMPP.on('login', () => {
              xmpp.loginListener(localIp, password, serverName, userName);
              return resolve();
            });
            XMPP.on('loginError', (message) => {
              const xml = getXmlMessage(message);
              if (xml) {
                const msg = xmlToJson(xml);
                return reject(msg.failure.text);
              }
            });
            XMPP.on('message', (message) => {
              const parts = message.body.split('&');
              const msg = parts[5];
              const msgType = parts[4];
              xmpp.lastUpdateTime = parts[3];
              if (parts.length === 7 || parts[0] === 'server') {
                if (msgType === '0') {
                  const xml = getXmlMessage(msg);
                  if (xml) {
                    const json = xmlToJson(xml);
                    const scenarioId =
                      json.settings.currentscenario['@attributes'].value;
                    const normalizedData = normalizePlaces(json.settings
                      .places as any);
                    normalizedData[1].forEach((device: IDevice) => {
                      xmpp.getDeviceStatus(device.number);
                    });
                    xmpp.dispatch!(addPlaces(normalizedData));
                    xmpp.dispatch!(updateTime(xmpp.lastUpdateTime));
                    xmpp.dispatch!(updateScenario(Number(scenarioId)));
                  }
                } else if (msgType === '2') {
                  const msgParts = msg.split('-');
                  const deviceNumber = msgParts[2];
                  xmpp.dispatch!(
                    updateDevice(
                      deviceNumber,
                      msgParts[3],
                      msgParts[4],
                      msgParts[5],
                      msgParts[6],
                      msgParts[7]
                    )
                  );
                } else if (msgType === '1') {
                  xmpp.dispatch!(updateScenario(Number(msg)));
                }
              }
            });
          } else {
            return resolve();
          }
        }
      }
    });
  },
  message: (msg: string) => {
    if (xmpp.localIp) {
      Sockets.write(msg);
    } else {
      XMPP.message(msg, `${xmpp.serverName}@jabb.im`);
    }
  },
  disconnect: () => {
    if (xmpp.localIp) {
      Sockets.disconnect();
    } else {
      XMPP.disconnect();
      XMPP.removeListeners();
    }
  },
  getPlaces: () => {
    const msg = `client&${xmpp.userName}&${xmpp.serverName}&00:00:00&0&&client`;
    xmpp.message(msg);
  },
  getDeviceStatus: (deviceNumber: string) => {
    const message = `K-S-${deviceNumber}-0-0-48-48-0-0`;
    const packedMessage = xmpp.packMessage(message, '2');
    xmpp.message(packedMessage);
  },
  packMessage: (message: string, type: string): string => {
    return `client&${xmpp.userName}&${xmpp.serverName}&${
      xmpp.lastUpdateTime
    }&${type}&${message}&client`;
  },
  updateDeviceStatus: (msg: string) => {
    const message = xmpp.packMessage(msg, '2');
    xmpp.message(message);
  },
  updateScenario: (msg: string) => {
    const message = xmpp.packMessage(msg, '1');
    xmpp.message(message);
  },
};

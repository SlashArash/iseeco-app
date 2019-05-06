import IPlaces from './IPlaces';
import IDevices from './IDevices';
import IApp from './IApp';
import { IConnection } from './IConnection';

interface IStore {
  app: IApp;
  places: IPlaces;
  devices: IDevices;
  connection: IConnection;
}

export default IStore;

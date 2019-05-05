import IUser from './IUser';

interface IApp extends IUser {
  lastUpdateTime: string | null;
  scenario: number;
  connected: boolean;
}

export default IApp;

export enum ConnectionActionTypes {
  UPDATE_CONNECTION = '@connection/UPDATE_CONNECTION',
}

export interface IUpdateConnection {
  type: ConnectionActionTypes.UPDATE_CONNECTION;
  connectionType: 'local' | 'internet';
  status: boolean;
}

export type ConnectionActions = IUpdateConnection;

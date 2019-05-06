import {
  ConnectionActionTypes,
  IUpdateConnection,
} from '../../types/ConnectionActions';

export const updateConnection = (
  connectionType: 'local' | 'internet',
  status: boolean
): IUpdateConnection => ({
  type: ConnectionActionTypes.UPDATE_CONNECTION,
  connectionType,
  status,
});

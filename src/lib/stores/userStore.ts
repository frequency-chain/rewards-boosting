import type { Account } from './accountsStore';
import { storable } from './storable';

export const user = storable<Account>('user', {
  address: '',
  isProvider: false,
});

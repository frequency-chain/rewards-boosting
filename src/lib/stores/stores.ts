import { derived, writable } from 'svelte/store';
import { createApi } from '../polkadotApi';
import { storable } from './storable';
import { defaultDotApi, type DotApi } from './storeTypes';
import { user } from './userStore';

export const dotApi = writable<DotApi>(defaultDotApi);

export const isLoggedIn = storable<boolean>('isLoggedIn', false);

export const logInPromise = derived([user], ([$user]) =>
  (async () => {
    if ($user?.network?.endpoint) {
      dotApi.set(await createApi($user?.network?.endpoint));
      if ($user.address !== '') {
        isLoggedIn.set(true);
      }
    }
  })()
);

export const logout = () => {
  isLoggedIn.set(false);
  user.set({ address: '', isProvider: false });
  dotApi.set(defaultDotApi);
};

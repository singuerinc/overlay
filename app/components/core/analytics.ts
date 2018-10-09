import { remote } from 'electron';
import Analytics from 'electron-ga';
import * as uuid from 'uuid/v4';
import { store, StoreKey } from './AppStore';

const isDevelopment = (r) => r.process.env.NODE_ENV === 'development';

const allowAnalytics = (): boolean => {
  if (isDevelopment(remote)) {
    return false;
  }
  return store.get(StoreKey.SETTING_ALLOW_ANALYTICS, true);
};

const trackingCode = 'UA-50962418-2';
const appVersion = '0.6.0';
const userId = store.get(StoreKey.APP_USER_ID, uuid());

store.set(StoreKey.APP_USER_ID, userId);

const analytics = new Analytics(trackingCode, {
  appName: 'Overlay',
  appVersion,
  userId
});

export const track = (
  category: string,
  action: string,
  label: string,
  value: number = 1
) => {
  if (allowAnalytics()) {
    // tslint:disable-next-line
    console.log('Tracking', `v${appVersion}`, category, action, label, value);
    analytics.send('event', { ec: category, ea: action, el: label, ev: value });
  }
};

export const initAnalytics = (): boolean => {
  const allow = store.get(StoreKey.SETTING_ALLOW_ANALYTICS, true);
  store.set(StoreKey.SETTING_ALLOW_ANALYTICS, allow);

  return allow;
};

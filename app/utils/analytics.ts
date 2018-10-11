import { remote } from 'electron';
import Analytics from 'electron-ga';
import * as uuid from 'uuid/v4';
import { PreferenceKey, preferences } from '../utils/preferences';

const isDevelopment = (r) => r.process.env.NODE_ENV === 'development';

const allowAnalytics = (): boolean => {
  if (isDevelopment(remote)) {
    return false;
  }
  return preferences.get(PreferenceKey.SETTING_ALLOW_ANALYTICS, true);
};

const trackingCode = 'UA-50962418-2';
const appVersion = '0.6.0';
const userId = preferences.get(PreferenceKey.APP_USER_ID, uuid());

preferences.set(PreferenceKey.APP_USER_ID, userId);

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
  const allow = preferences.get(PreferenceKey.SETTING_ALLOW_ANALYTICS, true);
  preferences.set(PreferenceKey.SETTING_ALLOW_ANALYTICS, allow);

  return allow;
};

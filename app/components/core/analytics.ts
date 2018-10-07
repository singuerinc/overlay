import Analytics from 'electron-ga';
import * as uuid from 'uuid/v4';
import * as store from 'store';

const trackingCode = 'UA-50962418-2';
const appVersion = '4.0.1';

const firstRun = store.get('firstRun') || true;
const userId = store.get('userId') || uuid();

store.set('firstRun', firstRun);
store.set('userId', userId);
store.set('optOut', false);

const analytics = new Analytics(trackingCode, {
  userId,
  appName: 'Overlay',
  appVersion
});

export const track = (
  category: string,
  action: string,
  label: string,
  value: number = 1
) => {
  console.log('Tracking', `v${appVersion}`, category, action, label, value);
  analytics.send('event', { ec: category, ea: action, el: label, ev: value });
};

export const initializeAnalytics = () => {
  track('app', 'first-run', firstRun);
};

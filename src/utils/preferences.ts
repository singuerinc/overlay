import * as Store from 'electron-store';

export enum PreferenceKey {
  SETTING_ALLOW_ANALYTICS = 'settings.allowAnalytics',
  APP_FIRST_RUN = 'app.firstRun',
  APP_USER_ID = 'app.userId'
}

const preferences = new Store();

export { preferences };

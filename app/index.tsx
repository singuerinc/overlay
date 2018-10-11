import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { setAllowAnalytics } from './actions/settings';
import { initAnalytics, track } from './components/core/analytics';
import { store as appStore, StoreKey } from './components/core/AppStore';
import { Root } from './components/Root';
import rootReducer from './reducers';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
const allow = initAnalytics();

track('app', 'first-run', appStore.get(StoreKey.APP_FIRST_RUN, true));
appStore.set(StoreKey.APP_FIRST_RUN, false);

store.dispatch(setAllowAnalytics(allow));

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

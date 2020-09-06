import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { setAllowAnalytics } from './actions/settings';
import { Root } from './components/Root';
import rootReducer from './reducers';
import { initAnalytics, track } from './utils/analytics';
import { PreferenceKey, preferences } from './utils/preferences';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
const allow = initAnalytics();

track('app', 'first-run', preferences.get(PreferenceKey.APP_FIRST_RUN, true));
preferences.set(PreferenceKey.APP_FIRST_RUN, false);

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

import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { setAllowAnalytics } from './actions/settings';
import { initializeAnalytics } from './components/core/analytics';
import { Root } from './components/Root';
import { configureStore } from './store/configureStore';

const store = configureStore({});
const allow = initializeAnalytics();

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

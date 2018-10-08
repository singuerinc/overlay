import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { injectGlobal } from 'styled-components';
import { App } from './App';

interface Props {
  store: Store;
}

export const Root = (props: Props) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

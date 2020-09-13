import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { App } from './App';

interface IProps {
    store: Store;
}

export const Root = (props: IProps) => (
    <Provider store={props.store}>
        <GlobalStyle />
        <App />
    </Provider>
);

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    position: relative;
    color: white;
    overflow-y: hidden;
    padding: 0;
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

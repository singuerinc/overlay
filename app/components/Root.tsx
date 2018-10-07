import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { App } from './App';

interface Props {
  store: Store;
}

export class Root extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

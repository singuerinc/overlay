import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import AppComponent from './components/App';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={AppComponent} />
    </Switch>
  </App>
);

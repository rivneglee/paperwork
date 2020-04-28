import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import '@paperwork/ui-styles';

import { createStore } from './store';
import registerServiceWorker from './registerServiceWorker';
import { withAuthValidation } from './service/authentication';
import DataSourceListPage from './pages/dataSource/list';
import SignInPage from './pages/signIn';

import './index.scss';

const store: any = createStore({});

ReactDOM.render(
  <div className="pwapp-root">
    <Provider store={store}>
      <HashRouter>
        <Route exact component={SignInPage} path="/signin/"/>
        <Route exact component={withAuthValidation(DataSourceListPage)} path="/:userId/datasource/"/>
      </HashRouter>
    </Provider>
  </div>,
  document.body as HTMLElement,
);
registerServiceWorker();

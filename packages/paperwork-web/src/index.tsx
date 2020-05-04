import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import '@paperwork/ui-styles';

import { createStore, StoreState, history } from './store';
import registerServiceWorker from './registerServiceWorker';
import { withAuthValidation, authenticationStorge } from './service/authentication';

import DataSourceListPage from './pages/dataSource/list';
import DataSourceDetailPage from './pages/dataSource/detail';
import SignInPage from './pages/signIn';

import './index.scss';

const authentication = authenticationStorge.get();
const initState: StoreState = {
  authentication,
  page: {},
};
const store: any = createStore(initState);

ReactDOM.render(
  <div className="pwapp-root">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route exact component={SignInPage} path="/signin/"/>
        <Route exact component={withAuthValidation(DataSourceListPage)} path="/:userId/datasource/"/>
        <Route exact component={withAuthValidation(DataSourceDetailPage)} path="/:userId/datasource/:dataSourceId"/>
      </ConnectedRouter>
    </Provider>
  </div>,
  document.body as HTMLElement,
);
registerServiceWorker();

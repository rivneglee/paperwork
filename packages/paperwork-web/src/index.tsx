import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import '@paperwork/ui-styles';

import { createStore, history } from './store';
import registerServiceWorker from './registerServiceWorker';
import { withAuthValidation } from './service/authentication';

import DataSourceListPage from './pages/dataSource/list';
import DataSourceDetailPage from './pages/dataSource/detail';
import TemplateListPage from './pages/template/list';
import SignInPage from './pages/signIn';

import './index.scss';

const store: any = createStore();

ReactDOM.render(
  <div className="pwapp-root">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route exact component={SignInPage} path="/signin/"/>
        <Route exact component={withAuthValidation(DataSourceListPage)} path="/datasource/"/>
        <Route exact component={withAuthValidation(DataSourceDetailPage)} path="/datasource/:dataSourceId"/>
        <Route exact component={withAuthValidation(TemplateListPage)} path="/public-templates"/>
        <Route exact component={withAuthValidation(TemplateListPage)} path="/templates"/>
      </ConnectedRouter>
    </Provider>
  </div>,
  document.body as HTMLElement,
);
registerServiceWorker();

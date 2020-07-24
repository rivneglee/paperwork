import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import '@paperwork/ui-styles';

import { createStore, getHistory } from './store';
import registerServiceWorker from './registerServiceWorker';
import { withAuthValidation } from './service/authentication';

import DataSourceListPage from './pages/dataSource/list';
import DataSourceDetailPage from './pages/dataSource/detail';
import TemplateListPage from './pages/template/list';
import TemplateDetailPage from './pages/template/detail';
import FormListPage from './pages/form/list';
import FormDetailPage from './pages/form/detail';
import CommitDetailPage from './pages/commit/detail';
import SignInPage from './pages/signIn';
import { PageNotFound } from './pages/error';

import './index.scss';

const store: any = createStore();

ReactDOM.render(
  <div className="pwapp-root">
    <Provider store={store}>
      <ConnectedRouter history={getHistory()}>
        <Switch>
          <Route exact component={SignInPage} path="/signin/"/>
          <Route exact component={withAuthValidation(DataSourceListPage)} path="/datasource/"/>
          <Route exact component={withAuthValidation(DataSourceDetailPage)} path="/datasource/:dataSourceId"/>
          <Route exact component={withAuthValidation(TemplateListPage)} path="/templates"/>
          <Route exact component={withAuthValidation(TemplateDetailPage)} path="/templates/:templateId"/>
          <Route exact component={withAuthValidation(FormListPage)} path="/forms"/>
          <Route exact component={withAuthValidation(FormDetailPage)} path="/forms/:formId"/>
          <Route exact component={CommitDetailPage} path="/f/:formId/c/:commitId"/>
          <Route component={PageNotFound}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </div>,
  document.body as HTMLElement,
);
registerServiceWorker();

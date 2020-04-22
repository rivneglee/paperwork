import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Scrollable } from '@paperwork/ui-widgets';
import '@paperwork/ui-styles';

import { createStore } from './store';
import registerServiceWorker from './registerServiceWorker';

import AppBar from './components/AppBar/AppBar';
import './index.scss';

const store: any = createStore({});

ReactDOM.render(
  <div className="pwapp-root">
    <AppBar/>
    <Scrollable className="pwapp-page">
      <Provider store={store}>
        <HashRouter>
        </HashRouter>
      </Provider>
    </Scrollable>
  </div>,
  document.body as HTMLElement,
);
registerServiceWorker();

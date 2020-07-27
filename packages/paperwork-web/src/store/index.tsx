import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StoreState } from './types';
import { authenticationStorge } from '../service/authentication';
import {
  pageReducer,
  authenticationReducer,
  navigationReducer,
  defaultPageState,
  notificationUpdateReducer,
} from './reducers';

const browserHistory = createBrowserHistory();

export const getHistory = () => browserHistory;

const authentication = authenticationStorge.get();

const initState: StoreState = {
  authentication,
  page: defaultPageState,
  navigation: {},
  notificationUpdate: { unread: 0 },
};

export const createStore = () => createReduxStore(
  enableBatching(combineReducers({
    page: pageReducer,
    authentication: authenticationReducer,
    router: connectRouter(getHistory()),
    navigation: navigationReducer,
    notificationUpdate: notificationUpdateReducer,
  })),
  initState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(getHistory()),
    ),
  ),
);

export * from './types';

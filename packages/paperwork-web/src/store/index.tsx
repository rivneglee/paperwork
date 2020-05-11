import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { pageReducer, authenticationReducer, defaultPageState } from './reducers';
import { StoreState } from './types';
import { authenticationStorge } from '../service/authentication';

export const history = createHashHistory();

const authentication = authenticationStorge.get();

const initState: StoreState = {
  authentication,
  page: defaultPageState,
};

export const createStore = () => createReduxStore(
  enableBatching(combineReducers({
    page: pageReducer,
    authentication: authenticationReducer,
    router: connectRouter(history),
  })),
  initState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);

export * from './types';

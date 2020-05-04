import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { pageReducer, authenticationReducer } from './reducers';
import { StoreState } from './types';

export const history = createHashHistory();

export const createStore = (initState: StoreState) => createReduxStore(
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

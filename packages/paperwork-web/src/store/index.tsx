import { combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { pageReducer, authenticationReducer } from './reducers';
import { StoreState } from './types';

export const createStore = (initState: StoreState) => createReduxStore(
  enableBatching(combineReducers({
    page: pageReducer,
    authentication: authenticationReducer,
  })),
  initState,
  composeWithDevTools(),
);

export * from './types';

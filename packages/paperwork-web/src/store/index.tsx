import { combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

export const createStore = (initState: any) => createReduxStore(
  enableBatching(combineReducers({})),
  initState,
  composeWithDevTools(),
);

import { combineReducers, createStore as createReduxStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dataSourceListReducer } from '../pages/dataSource/list/reducers';

export const createStore = (initState: any) => createReduxStore(
  enableBatching(combineReducers({
    dataSourceList: dataSourceListReducer,
  })),
  initState,
  composeWithDevTools(),
);

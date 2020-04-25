import React from 'react';
import { connect } from 'react-redux';

import ListProvider from '../../../service/dataSource/ListProvider';
import Spinner from '../../../components/PageTransitionSpinner/Spinner';
import { DataSourceList } from '../../../schema/DataSource';
import DataSourceListPage from './components/DataSourceListPage';
import { createLoadDataSourceAction } from './actions';
import { getDataSouceList } from './selectors';

const mapDispatchToProps = (dispatch: any) => ({
  onLoadList: (dataSourceList: DataSourceList) => dispatch(
    createLoadDataSourceAction(dataSourceList),
  ),
});

const mapStateToProps = (state: any) => ({ dataSourceList: getDataSouceList(state) });

const Provider = connect(null, mapDispatchToProps)(ListProvider);

const PageView = connect(mapStateToProps)(DataSourceListPage);

export default () => (
  <Provider spinner={<Spinner />}>
    {() => <PageView />}
  </Provider>
);

import React from 'react';
// import { connect } from 'react-redux';

import ListProvider, { IntegrationState } from '../../../service/dataSource/ListProvider';
import DataSourceListPage from './components/DataSourceListPage';

/** Data provider can be used via redux or props **/
// import { DataSourceList } from '../../../schema/DataSource';
// import { createLoadDataSourceAction } from './actions';
// import { getDataSourceList } from './selectors';
// const mapDispatchToProps = (dispatch: any) => ({
//   onLoadList: (dataSourceList: DataSourceList) => dispatch(
//     createLoadDataSourceAction(dataSourceList),
//   ),
// });
//
// const mapStateToProps = (state: any) => ({ dataSourceList: getDataSourceList(state) });
//
// const Provider = connect(null, mapDispatchToProps)(ListProvider);
//
// const PageView = connect(mapStateToProps)(DataSourceListPage);
//
// export default () => (
//   <Provider>
//     {() => <PageView />}
//   </Provider>
// );

export default () => (
  <ListProvider>
    {
      ({ dataSourceList }: IntegrationState) => (
        <DataSourceListPage dataSourceList={dataSourceList}/>
      )
    }
  </ListProvider>
);

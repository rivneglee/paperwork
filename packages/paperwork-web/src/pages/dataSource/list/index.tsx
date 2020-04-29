import React from 'react';
import { connect } from 'react-redux';

import { ListProvider, ListProviderState } from '../../../service/dataSource';
import DataSourceListPage, { FilterOption, FilterOptions } from './components/DataSourceListPage';
import Spinner from '../../../components/PageTransitionSpinner/Spinner';
import { createLoadDataSourceAction, createUpdateFilterOptionAction } from './state/actions';
import { getEntries, getFilterOptions } from './state/selectors';
import { StoreState } from '../../../store';

const mapViewStateToProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
});

const PageView = connect(mapViewStateToProps)(DataSourceListPage);

export default connect()(({ dispatch }: any) => (
  <ListProvider spinner={<Spinner />}>
    {({ dataSourceList, list }: ListProviderState) => {
      dispatch(createLoadDataSourceAction(dataSourceList));

      // list()
      //   .then(data => dispatch(createLoadDataSourceAction(data)));
      const onFilterChange
        = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

      const onApplyFilter = (filterOptions: FilterOptions) => list(filterOptions);

      return <PageView onFilterChange={onFilterChange} onApplyFilter={onApplyFilter}/>;
    }}
  </ListProvider>
));

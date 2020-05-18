import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { ListProvider, ListProviderState } from '../../../../service/dataSource';
import DataSourceListPage, { FilterOption, FilterOptions } from '../components/DataSourceListPage';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { createLoadDataSourceAction, createUpdateFilterOptionAction } from '../state/actions';
import { getEntries, getFilterOptions } from '../state/selectors';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const PageView = connect(mapStateToViewProps)(DataSourceListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <ListProvider spinner={<Spinner />} userId={authentication.user.id}>
    {({ dataSourceList, list }: ListProviderState) => {
      dispatch(createLoadDataSourceAction(dataSourceList));

      const onCreateNew = () => dispatch(push('/dataSource/new'));

      const onFilterChange
        = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

      const onApplyFilter = (filterOptions: FilterOptions) => list(filterOptions);

      return (
        <PageView
          onCreateNew={onCreateNew}
          onFilterChange={onFilterChange}
          onApplyFilter={onApplyFilter}
        />);
    }}
  </ListProvider>
));

import React from 'react';
import { connect } from 'react-redux';

import ReportListPage, { FilterOptions, FilterOption } from './PageSwitcher';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { ListProvider, ListProviderState } from '../../../../service/report';
import { getEntries, getPagination, getFilterOptions } from '../state/selectors';
import { createLoadReportListAction, createUpdateFilterOptionAction } from '../state/actions';
import { push } from 'connected-react-router';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
  ...getPagination(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const PageView = connect(mapStateToViewProps)(ReportListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <ListProvider userId={authentication.user.id} preLoad>
    {({ reportList, list, isInitializing, isProcessing }: ListProviderState) => {
      if (isInitializing) {
        dispatch(createLoadReportListAction(reportList));
      }

      const onLoadNextPage = async (option: FilterOptions, page: number) => {
        const nextPageOfList = await list(option, page);
        dispatch(createLoadReportListAction(nextPageOfList));
      };

      const onFilterChange
        = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

      const onApplyFilter = async (filterOptions: FilterOptions) => {
        const filterResults = await list(filterOptions, 0);
        dispatch(createLoadReportListAction(filterResults));
      };

      const onEdit = (id: string) => dispatch(push(`/reports/${id}`));
      const onView = (id: string) => window.open(`/r/${id}`, '_blank');
      const onCreateNew = () => dispatch(push('/reports/new'));

      return (
        <PageView
          isProcessing={isProcessing}
          onLoadNextPage={onLoadNextPage}
          onFilterChange={onFilterChange}
          onApplyFilter={onApplyFilter}
          onEdit={onEdit}
          onView={onView}
          onCreateNew={onCreateNew}
        />);
    }}
  </ListProvider>
));

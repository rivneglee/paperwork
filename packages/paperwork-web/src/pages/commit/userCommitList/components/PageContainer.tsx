import React from 'react';
import { connect } from 'react-redux';

import { ListProvider, ListProviderState } from '../../../../service/commit';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import CommitListPage, { FilterOption, FilterOptions } from '../components/CommitListPage';
import { getEntries, getPagination, getFilterOptions } from '../state/selectors';
import { createLoadCommitListAction, createUpdateFilterOptionAction } from '../state/actions';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
  ...getPagination(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const View = connect(mapStateToViewProps)(CommitListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params }: any) => (
  <ListProvider
    userId={params.userId}
    preLoad
  >
    {
      ({ commitList, isProcessing, list }: ListProviderState) => {
        if (commitList) {
          dispatch(createLoadCommitListAction(commitList));
        }

        const onFilterChange
          = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

        const onApplyFilter = async (filterOptions: FilterOptions) => {
          const filterResults = await list(filterOptions, 0);
          dispatch(createLoadCommitListAction(filterResults));
        };

        const onLoadNextPage = async (option: FilterOptions, page: number) => {
          const nextPageOfList = await list(option, page);
          dispatch(createLoadCommitListAction(nextPageOfList));
        };

        const onView = (formId: string, commitId: string) => {
          window.open(`/f/${formId}/c/${commitId}`, '_blank');
        };

        return (
          <View
            onLoadNextPage={onLoadNextPage}
            onFilterChange={onFilterChange}
            onApplyFilter={onApplyFilter}
            isProcessing={isProcessing}
            onView={onView}
          />
        );
      }
    }
  </ListProvider>
));

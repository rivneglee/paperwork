import React from 'react';
import { connect } from 'react-redux';

import { ListProvider, ListProviderState } from '../../../../service/commit';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import CommitListPage, { FilterOption, FilterOptions, GroupBy } from '../components/PageSwitcher';
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

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication, groupBy }: any) => (
  <ListProvider
    userId={authentication.user.id}
  >
    {
      ({ isProcessing, list, isInitializing }: ListProviderState) => {
        const initPage = async () => {
          const filterMap = {
            [GroupBy.FORM]: { formId: params.formId },
            [GroupBy.COMMITTER]: { committerId: authentication.user.id },
          };
          const commitList = await list(filterMap[groupBy]);
          dispatch(createLoadCommitListAction(commitList));
        };

        if (isInitializing) {
          initPage();
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
            groupBy={groupBy}
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

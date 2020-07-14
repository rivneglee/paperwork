import React from 'react';
import { connect } from 'react-redux';

import FormListPage, { FilterOptions, FilterOption } from './FormListPage';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { ListProvider, ListProviderState } from '../../../../service/form';
import { getEntries, getPagination, getFilterOptions } from '../state/selectors';
import { createLoadFormListAction, createUpdateFilterOptionAction } from '../state/actions';
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

const PageView = connect(mapStateToViewProps)(FormListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <ListProvider userId={authentication.user.id} preLoad>
    {({ formList, list, isInitializing, isProcessing }: ListProviderState) => {
      if (isInitializing) {
        dispatch(createLoadFormListAction(formList));
      }

      const onLoadNextPage = async (option: FilterOptions, page: number) => {
        const nextPageOfList = await list(option, page);
        dispatch(createLoadFormListAction(nextPageOfList));
      };

      const onFilterChange
        = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

      const onApplyFilter = async (filterOptions: FilterOptions) => {
        const filterResults = await list(filterOptions, 0);
        dispatch(createLoadFormListAction(filterResults));
      };

      const onEdit = (id: string) => dispatch(push(`/forms/${id}`));
      const onCreateNew = () => dispatch(push('/forms/new'));

      return (
        <PageView
          isProcessing={isProcessing}
          onLoadNextPage={onLoadNextPage}
          onFilterChange={onFilterChange}
          onApplyFilter={onApplyFilter}
          onEdit={onEdit}
          onCreateNew={onCreateNew}
        />);
    }}
  </ListProvider>
));

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import TemplateListPage, { FilterOption, FilterOptions } from './PageSwitcher';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { ListProvider, ListProviderState } from '../../../../service/template';
import { getEntries, getPagination, getFilterOptions } from '../state/selectors';
import { createLoadTemplateListAction, createUpdateFilterOptionAction } from '../state/actions';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
  ...getPagination(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const PageView = connect(mapStateToViewProps)(TemplateListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <ListProvider userId={authentication.user.id} preLoad>
    {({ templateList, list, isInitializing, isProcessing }: ListProviderState) => {
      if (isInitializing) {
        dispatch(createLoadTemplateListAction(templateList));
      }

      const onLoadNextPage = async (option: FilterOptions, page: number) => {
        const nextPageOfList = await list(option, page);
        dispatch(createLoadTemplateListAction(nextPageOfList));
      };

      const onFilterChange
        = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

      const onApplyFilter = async (filterOptions: FilterOptions) => {
        const filterResults = await list(filterOptions, 0);
        dispatch(createLoadTemplateListAction(filterResults));
      };

      const onEdit = (id: string) => dispatch(push(`/templates/${id}`));
      const onCreateForm = (id: string) => dispatch(push(`/forms/new?sourceTemplateId=${id}&withDefaultDs=true`));
      const onCreateNew = () => dispatch(push('/templates/new'));

      return (
        <PageView
          onCreateNew={onCreateNew}
          onCreateForm={onCreateForm}
          onEdit={onEdit}
          isProcessing={isProcessing}
          onLoadNextPage={onLoadNextPage}
          onFilterChange={onFilterChange}
          onApplyFilter={onApplyFilter}
        />);
    }}
  </ListProvider>
));

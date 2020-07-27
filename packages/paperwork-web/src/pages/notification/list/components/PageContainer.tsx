import React from 'react';
import { connect } from 'react-redux';

import { ListProvider, ListProviderState } from '../../../../service/notification';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import NotificationListPage, { FilterOption, FilterOptions } from '../components/NotificationListPage';
import { getEntries, getPagination, getFilterOptions } from '../state/selectors';
import { createLoadNotificationListAction, createUpdateFilterOptionAction } from '../state/actions';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  filterOptions: getFilterOptions(state),
  ...getPagination(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const View = connect(mapStateToViewProps)(NotificationListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication, groupBy }: any) => (
  <ListProvider
    userId={authentication.user.id}
    preLoad
  >
    {
      ({ notificationList, isProcessing, list }: ListProviderState) => {

        if (notificationList) {
          dispatch(createLoadNotificationListAction(notificationList));
        }

        const onFilterChange
          = (option: FilterOption) => dispatch(createUpdateFilterOptionAction(option));

        const onApplyFilter = async (filterOptions: FilterOptions) => {
          const filterResults = await list(filterOptions, 0);
          dispatch(createLoadNotificationListAction(filterResults));
        };

        const onLoadNextPage = async (option: FilterOptions, page: number) => {
          const nextPageOfList = await list(option, page);
          dispatch(createLoadNotificationListAction(nextPageOfList));
        };

        return (
          <View
            onLoadNextPage={onLoadNextPage}
            onFilterChange={onFilterChange}
            onApplyFilter={onApplyFilter}
            isProcessing={isProcessing}
          />
        );
      }
    }
  </ListProvider>
));

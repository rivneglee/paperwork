import React from 'react';
import { connect } from 'react-redux';

import { ListProviderState, Provider } from '../../../../service/notification';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import NotificationListPage, { FilterOption, FilterOptions, Notification } from '../components/NotificationListPage';
import { getEntries, getFilterOptions, getPagination } from '../state/selectors';
import {
  createLoadNotificationListAction,
  createMarkAsReadActionAction,
  createUpdateFilterOptionAction,
} from '../state/actions';
import { NotificationEventType } from '../../../../schema/Notification';

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
  <Provider
    userId={authentication.user.id}
    preLoad
  >
    {
      ({ notificationList, isProcessing, list, setReadState }: ListProviderState) => {

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

        const onView = async (notification: Notification) => {
          if (notification.event.type === NotificationEventType.FILLING_FORM_INVITATION) {
            window.open(`/f/${notification.event.refId}/c/new`, '_blank');
          }
          await setReadState(notification.id);
          dispatch(createMarkAsReadActionAction(notification.id));
        };

        return (
          <View
            onView={onView}
            onLoadNextPage={onLoadNextPage}
            onFilterChange={onFilterChange}
            onApplyFilter={onApplyFilter}
            isProcessing={isProcessing}
          />
        );
      }
    }
  </Provider>
));

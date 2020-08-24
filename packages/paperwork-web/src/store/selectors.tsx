import { createSelector } from 'reselect';
import { StoreState } from './types';

export const getAuthentication = (state: StoreState) => state.authentication;

export const getPageSection = (state: StoreState) => state.page;

export const getActiveMenuId = (state: StoreState) => state.navigation.activeMenuId;

export const getUnreadNotifications = (state: StoreState) => state.notificationUpdate.unread;

export const getRoutingState = (state: StoreState) => state.router;
export const getQueryParams = createSelector(
  getRoutingState,
  (routingState: any) => {
    const { query = {} } = routingState.location;
    return query;
  },
);
export const getCurrentUserId = createSelector(
  getAuthentication,
  authentication => authentication && authentication.user ? authentication.user.id : undefined,
);

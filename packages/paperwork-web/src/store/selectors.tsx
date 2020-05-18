import { StoreState } from './types';

export const getAuthentication = (state: StoreState) => state.authentication;

export const getPageSection = (state: StoreState) => state.page;

export const getActiveMenuId = (state: StoreState) => state.navigation.activeMenuId;

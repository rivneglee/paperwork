import { StoreState } from './types';

export const getAuthentication = (state: StoreState) => state.authentication;

export const getPageSection = (state: StoreState) => state.page;

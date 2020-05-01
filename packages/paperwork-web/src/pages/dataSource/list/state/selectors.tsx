import { createSelector } from 'reselect';

import { Authentication, User, UserIdentifier } from '../../../../schema/User';
import { getAuthentication, getPage } from '../../../../store/selectors';
import { DataSourceListPageState } from './reducers';

const getBadges = (user: User, datasource: { owner: UserIdentifier }) => {
  const badges = [];
  if (user.id !== datasource.owner) {
    badges.push({
      color: 'secondary',
      text: 'Collaborative',
    });
  }
  return badges;
};

export const getEntries = createSelector(
  getAuthentication,
  getPage,
  (authentication: Authentication, page: DataSourceListPageState) => {
    const { user } = authentication;
    const { data = [] } = page;
    return data.map(datasource => ({
      badges: getBadges(user, datasource),
      link: `/${user.id}/dataSource/${datasource.id}`,
      ...datasource,
    }));
  },
);

export const getFilterOptions = createSelector(
  getPage,
  (page: DataSourceListPageState) => page.filterOptions,
);

import React from 'react';
import { connect } from 'react-redux';

import {
  AggregatedCommitsProviderState,
  AggregatedCommitsProvider,
  FilterCondition,
} from '../../../../service/statistic';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import Table from './Table';
import SettingsView from './Settings';
import { getQuery } from './selectors';

const mapStateToProps = (state: StoreState, props: any) => ({
  authentication: getAuthentication(state),
  query: getQuery(props),
});

const View = ({ authentication, dispatch, query, ...props }: any) => (
  <AggregatedCommitsProvider
    query={query}
    preLoad
    userId={authentication.userId}
  >
    {
      ({ commits, isProcessing, load }: AggregatedCommitsProviderState) => {
        const onApplyFilter = async (filters: FilterCondition[]) => {
          await load(0, filters);
        };

        const onPageChange = async (page: number, filters: FilterCondition[]) => {
          await load(page, filters);
        };

        return (
          <Table onPageChange={onPageChange} onApplyFilter={onApplyFilter} {...props} data={commits} isProcessing={isProcessing}/>
        );
      }
    }
  </AggregatedCommitsProvider>
);

const MainView = connect(mapStateToProps)(View);

export default {
  MainView,
  SettingsView,
};

import React from 'react';
import { connect } from 'react-redux';

import { AggregatedCommitsProviderState, AggregatedCommitsProvider } from '../../../../service/statistic';
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
      ({ commits, isProcessing }: AggregatedCommitsProviderState) => {
        return (
          <Table {...props} data={commits} isProcessing={isProcessing}/>
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

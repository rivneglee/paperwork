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
    user={authentication.user}
  >
    {
      ({ commits, isProcessing, load, exportCSV }: AggregatedCommitsProviderState) => {
        const onApplyFilter = async (filters: FilterCondition[]) => {
          await load(0, filters);
        };

        const onExport = async (filters: FilterCondition[]) => {
          await exportCSV(filters);
        };

        const onPageChange = async (page: number, filters: FilterCondition[]) => {
          await load(page, filters);
        };

        const onOpen = (formId: string, commitId: string) => {
          window.open(`/f/${formId}/c/${commitId}`, '_blank');
        };

        return (
          <Table
            onPageChange={onPageChange}
            onApplyFilter={onApplyFilter}
            onExport={onExport}
            onOpen={onOpen}
            data={commits}
            isProcessing={isProcessing}
            {...props}
          />
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

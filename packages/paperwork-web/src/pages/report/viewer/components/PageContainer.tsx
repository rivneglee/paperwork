import React from 'react';
import { connect } from 'react-redux';

import { DetailProvider, DetailProviderState } from '../../../../service/report';
import { StoreState } from '../../../../store';
import { getAuthentication, getQueryParams } from '../../../../store/selectors';
import { getReportDetail } from '../state/selectors';
import { createLoadReportDetailAction } from '../state/actions';
import ViewReportPage from './ViewReportPage';

const mapStateToViewProps = (state: StoreState) => ({
  report: getReportDetail(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
  queryParams: getQueryParams(state),
});

const View = connect(mapStateToViewProps)(ViewReportPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <DetailProvider
    userId={authentication.user.id}
    reportId={params.reportId}
    preLoad
  >
    {
      ({ report , isProcessing }: DetailProviderState) => {
        if (report) {
          dispatch(createLoadReportDetailAction(report));
        }

        return (
          <View
            isProcessing={isProcessing}
          />
        );
      }
    }
  </DetailProvider>
));

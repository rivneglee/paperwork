import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { DetailProvider, DetailProviderState } from '../../../../service/report';
import { StoreState } from '../../../../store';
import { getAuthentication, getQueryParams } from '../../../../store/selectors';
import ReportDetailPage from '../components/PageSwitcher';
import { getReportDetail, getIsPageEdited } from '../state/selectors';
import { createLoadReportDetailAction, createUpdateReportAction } from '../state/actions';
import { ReportDetail } from '../../../../schema/Report';

const mapStateToViewProps = (state: StoreState) => ({
  report: getReportDetail(state),
  isPageEdited: getIsPageEdited(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
  queryParams: getQueryParams(state),
});

const View = connect(mapStateToViewProps)(ReportDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => {
  const detailPageWrapper = (
    <DetailProvider
      userId={authentication.user.id}
      formId={params.formId}
      preLoad
    >
      {
        ({ report, isProcessing, remove, create, update }: DetailProviderState) => {
          if (report) {
            dispatch(createLoadReportDetailAction(report));
          }

          const navigateToList = () => dispatch(push('/reports'));

          const onUpdate = (report: ReportDetail) => dispatch(createUpdateReportAction(report));

          const onCancel = () => navigateToList();

          const onDelete = async () => {
            await remove();
            navigateToList();
          };

          const onSave = async (report: ReportDetail) => {
            const saveHandler = params.reportId === 'new' ? create : update;
            await saveHandler(report);
            navigateToList();
          };

          return (
            <View
              isCreating={params.reportId === 'new'}
              isProcessing={isProcessing}
              onUpdate={onUpdate}
              onCancel={onCancel}
              onDelete={onDelete}
              onSave={onSave}
            />
          );
        }
      }
    </DetailProvider>
  );
  return detailPageWrapper;
});

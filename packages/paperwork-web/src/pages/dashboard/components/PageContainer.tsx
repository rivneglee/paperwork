import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { StoreState } from '../../../store';
import DashboardPage from './PageSwitcher';

const mapStateToViewProps = (state: StoreState) => ({});

export default connect(mapStateToViewProps)(({ dispatch }: any) => {
  const onCreateNewForm = () => dispatch(push('/forms/new?withDefaultDs=true'));
  const onCreateNewTemplate = () => dispatch(push('/templates/new'));
  const onCreateNewReport = () => dispatch(push('/reports/new'));
  const onViewDataSource = () => dispatch(push('/datasource'));
  const onViewNotifications = () => dispatch(push('/notifications'));
  const onViewForms = () => dispatch(push('/forms'));
  return (
    <DashboardPage
      onCreateNewForm={onCreateNewForm}
      onCreateNewTemplate={onCreateNewTemplate}
      onCreateNewReport={onCreateNewReport}
      onViewDataSource={onViewDataSource}
      onViewNotifications={onViewNotifications}
      onViewForms={onViewForms}
    />
  );
});

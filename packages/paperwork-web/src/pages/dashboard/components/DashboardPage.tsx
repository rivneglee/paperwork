import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';

import AppBar from '../../../components/AppBar/AppBar';

import { FormInfoCard } from './FormInfoCard';
import { TemplateInfoCard } from './TemplateInfoCard';
import { ReportInfoCard } from './ReportInfoCard';
import { DataSourceInfoCard } from './DataSourceInfoCard';
import { SupportCard } from './SupportCard';
import ReminderCard from './ReminderCard';
import TrendCard from './TrendCard';
import './DashboardPage.scss';

interface Props {
  onCreateNewForm: () => void;
  onCreateNewTemplate: () => void;
  onCreateNewReport: () => void;
  onViewDataSource: () => void;
  onViewNotifications: () => void;
  onViewForms: () => void;
}

const DashboardPage: FunctionComponent<Props> = ({
  onCreateNewForm,
  onCreateNewTemplate,
  onCreateNewReport,
  onViewDataSource,
  onViewNotifications,
  onViewForms,
}) => {
  return (
    <BaseTemplate
      header={<AppBar activeMenuId="dashboard"/>}
    >
      <div className="pwapp-dashboard">
        <div className="pwapp-dashboard__primary">
          <FormInfoCard onCreateNewForm={onCreateNewForm}/>
          <TemplateInfoCard onCreateNewTemplate={onCreateNewTemplate}/>
          <ReportInfoCard onCreateNewReport={onCreateNewReport}/>
          <DataSourceInfoCard onViewDataSource={onViewDataSource}/>
        </div>
        <div className="pwapp-dashboard__secondary">
          <ReminderCard onViewNotifications={onViewNotifications} onViewForms={onViewForms}/>
          <TrendCard/>
          <SupportCard/>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default DashboardPage;

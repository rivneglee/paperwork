import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';

import AppBar from '../../../components/AppBar/AppBar';

import './DashboardPage.scss';

interface Props {
  onCreateNewForm: () => void;
  onCreateNewTemplate: () => void;
  onCreateNewReport: () => void;
  onViewDataSource: () => void;
  onViewNotifications: () => void;
  onViewForms: () => void;
}

const DashboardPage: FunctionComponent<Props> = ({}) => {
  return (
      <BaseTemplate
          header={<AppBar activeMenuId="dashboard"/>}
      >
        Dashboard
      </BaseTemplate>
  );
};

export default DashboardPage;

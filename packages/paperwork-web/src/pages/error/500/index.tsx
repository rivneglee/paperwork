import React from 'react';
import { BaseTemplate, PageState, Card } from '@paperwork/ui-widgets';
import AppBar from '../../../components/AppBar/AppBar';
const pageNotFound = require('../../../assets/reporting.svg');

export default () => (
  <BaseTemplate
    header={<AppBar />}>
    <Card>
      <PageState
        image={pageNotFound}
        title={<span className="pwapp-error-code">Some error at server</span>}
        description="We are currently having problem with handling your request. Please retry again in few minutes and contact administrator if error is still there."
      />
    </Card>
  </BaseTemplate>
);

import React from 'react';
import { BaseTemplate, PageState, Card } from '@paperwork/ui-widgets';
import AppBar from '../../../components/AppBar/AppBar';
import pageNotFound from '../../../assets/reporting.svg';

export default () => (
  <BaseTemplate
    header={<AppBar />}
  >
    <Card>
      <PageState
        image={pageNotFound}
        title={<span className="pwapp-error-code">404 Page not found</span>}
        description="The page you visiting is not found or the identifier of resource is not existing in system."
      />
    </Card>
  </BaseTemplate>
);

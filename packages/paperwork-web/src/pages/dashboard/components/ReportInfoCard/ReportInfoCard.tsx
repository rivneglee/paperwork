import React from 'react';
import { Button, Card } from '@paperwork/ui-widgets';

import './ReportInfoCard.scss';
const img = require('../../../../assets/reporting.svg');

interface Props {
  onCreateNewReport: () => void;
}

export default ({ onCreateNewReport }: Props) => (
    <Card>
      <div className="pwapp-report-info">
        <div className="pwapp-report-info__primary">
          <div className="pwapp-report-info__title">Visualize Data via Report</div>
          <div className="pwapp-report-info__description">
            You can customise forms on demand and send them to people to collect data you are interested.
          </div>
          <div>
            <Button onClick={onCreateNewReport} size="xl" color="primary">Create a report</Button>
          </div>
        </div>
        <div className="pwapp-report-info__secondary">
          <img src={img}/>
        </div>
      </div>
    </Card>
);

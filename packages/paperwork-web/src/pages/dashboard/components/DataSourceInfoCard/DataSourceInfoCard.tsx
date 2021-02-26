import React from 'react';
import { Button, Card } from '@paperwork/ui-widgets';

import './DataSourceInfoCard.scss';
const img = require('../../../../assets/data-sources.svg');

interface Props {
  onViewDataSource: () => void;
}

export default ({ onViewDataSource }: Props) => (
    <Card>
      <div className="pwapp-datasource-info">
        <div className="pwapp-datasource-info__primary">
          <img src={img}/>
        </div>
        <div className="pwapp-datasource-info__secondary">
          <div className="pwapp-datasource-info__title">Manage Your Data</div>
          <div className="pwapp-datasource-info__description">
              All forms are connect to datasource.
              You can expose your collected data by sharing your datasource.
          </div>
          <div className="pwapp-datasource-info__button">
              <Button onClick={onViewDataSource} size="xl" color="secondary">View datasource</Button>
          </div>
        </div>
      </div>
    </Card>
);

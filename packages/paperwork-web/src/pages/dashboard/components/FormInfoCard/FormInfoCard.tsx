import React from 'react';
import { Button, Card } from '@paperwork/ui-widgets';

import './FormInfoCard.scss';
const img = require('../../../../assets/compute-data.svg');

interface Props {
  onCreateNewForm: () => void;
}

export default ({ onCreateNewForm }: Props) => (
    <Card>
      <div className="pwapp-form-info">
        <div className="pwapp-form-info__primary">
          <div className="pwapp-form-info__title">Collecting Data via Form</div>
          <div className="pwapp-form-info__description">
            You can customise forms on demand and send them to people to collect data you are interested.
          </div>
          <div>
            <Button onClick={onCreateNewForm} size="xl" color="primary">Create a form</Button>
          </div>
        </div>
        <div className="pwapp-form-info__secondary">
          <img src={img}/>
        </div>
      </div>
    </Card>
);

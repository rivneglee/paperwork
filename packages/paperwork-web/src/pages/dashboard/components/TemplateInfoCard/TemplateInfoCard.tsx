import React from 'react';
import { Button, Card } from '@paperwork/ui-widgets';

import './TemplateInfoCard.scss';
const img = require('../../../../assets/data-destinations.svg');

interface Props {
  onCreateNewTemplate: () => void;
}

export default ({ onCreateNewTemplate }: Props) => (
    <Card>
      <div className="pwapp-template-info">
        <div className="pwapp-template-info__primary">
          <img src={img}/>
        </div>
        <div className="pwapp-template-info__secondary">
          <div className="pwapp-template-info__title">Make Your Forms Reusable</div>
          <div className="pwapp-template-info__description">
              You can create a template and create form from the template later.
              And other people can also use your template if you make your template public.
          </div>
          <div className="pwapp-template-info__button">
              <Button onClick={onCreateNewTemplate} size="xl" color="secondary">Create a template</Button>
          </div>
        </div>
      </div>
    </Card>
);

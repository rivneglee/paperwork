import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar/AppBar';

interface Props {}

const TemplateListPage: FunctionComponent<Props> = ({}) => (
  <BaseTemplate
    header={<AppBar />}
  >
    Template list
  </BaseTemplate>
);

export default TemplateListPage;

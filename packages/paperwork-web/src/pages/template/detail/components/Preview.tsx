import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import { getItemComponentMap, getLayoutComponentMap } from '../../../../components/FormAddons';

interface Props {
  template: TemplateDetail;
}

const Preview: FunctionComponent<Props> = ({
  template,
}) => {
  return (
    <BaseTemplate>
      <FormEditor
        {...template}
        itemComponentMap={getItemComponentMap()}
        layoutComponentMap={getLayoutComponentMap()}
      />
    </BaseTemplate>
  );
};

export default Preview;

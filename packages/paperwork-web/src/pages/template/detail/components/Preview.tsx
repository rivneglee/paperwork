import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import { getInputMap, getLayoutMap } from '../../../../components/FormAddons';

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
        itemMetadataMap={getInputMap()}
        layoutComponentMap={getLayoutMap()}
      />
    </BaseTemplate>
  );
};

export default Preview;

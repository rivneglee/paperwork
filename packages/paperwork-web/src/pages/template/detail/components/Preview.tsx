import React, { FunctionComponent } from 'react';
import {
  BaseTemplate,
  FormProps,
} from '@paperwork/ui-widgets';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import { getItemComponentMap, getLayoutComponentMap } from '../../../../components/FormAddons';

interface Props {
  template: TemplateDetail;
  onChange: (formProps: FormProps) => void;
}

const Preview: FunctionComponent<Props> = ({
  template,
  onChange,
}) => {
  return (
    <BaseTemplate>
      <FormEditor
        {...template}
        onChange={onChange}
        itemComponentMap={getItemComponentMap()}
        layoutComponentMap={getLayoutComponentMap()}
      />
    </BaseTemplate>
  );
};

export default Preview;

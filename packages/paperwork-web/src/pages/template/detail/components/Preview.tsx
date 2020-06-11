import React, { FunctionComponent } from 'react';
import {
  BaseTemplate,
  FormProps,
} from '@paperwork/ui-widgets';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import FormEditor from '../../../../components/FormEditor/FormEditor';

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
      <FormEditor {...template} onChange={onChange}/>
    </BaseTemplate>
  );
};

export default Preview;

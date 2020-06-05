import React, { FunctionComponent } from 'react';
import {
  BaseTemplate,
  Icons,
  FormProps,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer } from '../../../../components/FormDesigner';
import { TextInput, Combobox } from '../../../../components/FormItems';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isPageEdited: boolean;
  onUpdate?: (formProps: FormProps) => void;
}

const itemComponentMap = {
  input: { MainView: TextInput },
  select: { MainView: Combobox },
};

const TemplateDetailPage: FunctionComponent<Props> = ({
  template,
  isPageEdited,
  isProcessing,
  onUpdate,
}) => (
  <BaseTemplate
    header={<AppBar activeMenuId="template"/>}
    isProcessing={isProcessing}
    spinner={<Spinner/>}
  >
    <Designer
      onChange={onUpdate}
      itemComponentMap={itemComponentMap}
      name={template.name}
      theme={template.theme}
      layout={template.layout}
      items={template.items}
      toolkitItems={[
        { icon: <Icons.Text/>, itemType: 'text' },
        { icon: <Icons.TextInput/>, itemType: 'input' },
        { icon: <Icons.ComboBox/>, itemType: 'select' },
        { icon: <Icons.TextArea/>, itemType: 'textarea' },
        { icon: <Icons.Attachment/>, itemType: 'attachment' },
        { icon: <Icons.Rate/>, itemType: 'rating' },
      ]}
    />
  </BaseTemplate>
);

export default TemplateDetailPage;

import React, { FunctionComponent } from 'react';
import {
  BaseTemplate,
  Input,
  Select,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer } from '../../../../components/FormDesigner';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isPageEdited: boolean;
}

const itemComponentMap = {
  input: { MainView: Input },
  select: { MainView: Select },
};

const TemplateDetailPage: FunctionComponent<Props> = ({
  template,
  isPageEdited,
  isProcessing,
}) => {
  return (
    <BaseTemplate
      header={<AppBar activeMenuId="template"/>}
      isProcessing={isProcessing}
      spinner={<Spinner/>}
    >
      <Designer
        itemComponentMap={itemComponentMap}
        name={template.name}
        theme={template.themeColor}
        layout={template.layout}
        items={template.items}
        onDragEnd={() => {}}
      />
    </BaseTemplate>
  );
};

export default TemplateDetailPage;

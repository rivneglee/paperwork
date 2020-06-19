import React, { FunctionComponent } from 'react';
import { BaseTemplate } from '@paperwork/ui-widgets';

import { TemplateDetail } from '../../../../schema/Template';
import { getInputMap, getLayoutMap, getButtonMap } from '../../../../components/FormAddons';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import './TemplatePreviewPage.scss';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isThumbnail: boolean;
}

const TemplatePreviewPage: FunctionComponent<Props> = ({
  template,
  isThumbnail,
  isProcessing,
}) => {
  const formEditor = (
    <FormEditor
      {...template}
      itemMetadataMap={{
        ...getInputMap(),
        ...getButtonMap(),
      }}
      layoutComponentMap={getLayoutMap()}
    />
  );

  const thumbnailView = (
    <div
      className="pwapp-template-preview-page"
    >
      {formEditor}
    </div>
  );

  return isThumbnail ? thumbnailView : (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
    >
      {formEditor}
    </BaseTemplate>
  );
};

export default TemplatePreviewPage;

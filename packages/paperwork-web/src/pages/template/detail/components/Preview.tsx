import React, { FunctionComponent } from 'react';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import HeaderImagesProvider from '../../../../components/FormHeaderImageProvider/HeaderImagesProvider';
import { getButtonMap, getInputMap, getLayoutMap } from '../../../../components/FormAddons';

interface Props {
  template: TemplateDetail;
}

const Preview: FunctionComponent<Props> = ({
  template,
}) => (
  <HeaderImagesProvider>
    {
      ({ getImageByKey }) => (
        <FormEditor
          {...template}
          headerImage={getImageByKey(template.headerImage)}
          itemMetadataMap={{
            ...getInputMap(),
            ...getButtonMap(),
          }}
          layoutComponentMap={getLayoutMap()}
        />
      )
    }
  </HeaderImagesProvider>
);

export default Preview;

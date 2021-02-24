import React, { FunctionComponent } from 'react';
import { BaseTemplate, FormMode } from '@paperwork/ui-widgets';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import {
  getLayoutMap,
  getStatisticMap,
} from '../../../../components/FormAddons';
import HeaderImagesProvider from '../../../../components/FormHeaderImageProvider/HeaderImagesProvider';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import { ReportDetail } from '../../../../schema/Report';

interface Props {
  report: ReportDetail;
  isProcessing?: boolean;
}

const ViewReportPage: FunctionComponent<Props> = ({
  report,
  isProcessing,
}) => {
  const reportView = (
    <HeaderImagesProvider>
      {
        ({ getImageByKey }) => (
          <FormEditor
            mode={FormMode.READONLY}
            {...report}
            headerImage={getImageByKey(report.headerImage)}
            itemMetadataMap={{
              ...getStatisticMap(),
            }}
            layoutComponentMap={getLayoutMap()}
          />
        )
      }
    </HeaderImagesProvider>
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
    >
      {reportView}
    </BaseTemplate>
  );
};

export default ViewReportPage;

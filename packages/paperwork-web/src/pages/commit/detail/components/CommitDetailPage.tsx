import React, { FunctionComponent } from 'react';
import { BaseTemplate, FormMode } from '@paperwork/ui-widgets';

import { SucceedMessage } from '../../../../schema/Form';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { getInputMap, getLayoutMap, getButtonMap, getExpressionMap } from '../../../../components/FormAddons';
import HeaderImagesProvider from '../../../../components/FormHeaderImageProvider/HeaderImagesProvider';
import FormEditor from '../../../../components/FormEditor/FormEditor';
import SucceedState from '../../../../components/FormEditor/SucceedState';
import { CommitDetail } from '../../../../schema/Commit';

interface Props {
  commit: CommitDetail;
  succeedMessage?: SucceedMessage;
  isProcessing?: boolean;
  onChange: (itemId: string, value: any) => void;
  onSubmit: (commit: CommitDetail) => void;
  mode: FormMode;
}

const CommitDetailPage: FunctionComponent<Props> = ({
  commit,
  onSubmit,
  onChange,
  isProcessing,
  succeedMessage,
  mode,
}) => {
  const handleSubmit = () => onSubmit(commit);
  const formView = (
    <HeaderImagesProvider>
      {
        ({ getImageByKey }) => (
          <FormEditor
            mode={mode}
            {...commit}
            headerImage={getImageByKey(commit.headerImage)}
            itemMetadataMap={{
              ...getInputMap(),
              ...getButtonMap({ onSubmit: handleSubmit }),
              ...getExpressionMap({ values: commit.values }),
            }}
            layoutComponentMap={getLayoutMap()}
            onChange={onChange}
          />
        )
      }
    </HeaderImagesProvider>
  );

  const succeedView = (<SucceedState successMessage={succeedMessage}/>);

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
    >
      {
        succeedMessage ? succeedView : formView
      }
    </BaseTemplate>
  );
};

export default CommitDetailPage;

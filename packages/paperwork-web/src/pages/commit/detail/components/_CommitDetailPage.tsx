import React, { FunctionComponent } from 'react';
import { BaseTemplate, FormMode, PageState } from '@paperwork/ui-widgets';

import { SucceedMessage } from '../../../../schema/Form';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { getInputMap, getLayoutMap, getButtonMap } from '../../../../components/FormAddons';
import HeaderImagesProvider from '../../../../components/FormHeaderImageProvider/HeaderImagesProvider';
import FormEditor from '../../../../components/FormEditor/FormEditor';
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
            }}
            layoutComponentMap={getLayoutMap()}
            onChange={onChange}
          />
        )
      }
    </HeaderImagesProvider>
  );

  const {
    title = 'You form have been submitted',
    subTitle = 'Nice one. Thanks for using PaperWork! You can click the links on below to share this form with your friends.',
  } = succeedMessage || {};

  const succeedView = (
    <PageState
      title={title}
      description={subTitle}
    />
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner type="donut"/>}
    >
      {
        succeedMessage ? succeedView : formView
      }
    </BaseTemplate>
  );
};

export default CommitDetailPage;

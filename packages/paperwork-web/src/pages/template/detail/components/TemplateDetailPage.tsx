import React, { FunctionComponent, useState } from 'react';
import htmlToImage from 'html-to-image';
import {
  BaseTemplate,
  Icons,
  IconButton,
  FormThemeColors,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer, PaperThemeModal } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
  onUpdate: (template: TemplateDetail) => void;
  onCancel: () => void;
  onSave: (template: TemplateDetail, thumbnail: string) => void;
  onDelete: () => void;
}

const TemplateDetailPage: FunctionComponent<Props> = ({
  template,
  isPageEdited,
  isProcessing,
  isCreating,
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
  let formRef: HTMLDivElement;
  const setFormRef = (ref: HTMLDivElement) => formRef = ref;
  const [modalType, setModalType] = useState('');

  const onCloseModal = () => setModalType('');

  const onClickCancel = () => {
    if (isPageEdited) {
      setModalType('unsave');
    } else {
      onCancel();
    }
  };

  const onClickDelete = () => setModalType('delete');

  const onClickTheme = () => setModalType('theme');

  const onClickSave = async () => {
    const img = await htmlToImage.toJpeg(formRef, { quality: 0.1 });
    onSave(template, img);
  };

  const onChoseThemeColor = (theme: FormThemeColors) => {
    onUpdate({
      ...template,
      theme,
    });
  };

  const onChoseHeaderImage = (headerImage: string) => {
    onUpdate({
      ...template,
      headerImage,
    });
  };

  return (
    <BaseTemplate
      header={<AppBar activeMenuId="templates" secondaryMenu={
        <>
          <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
          <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
          <IconButton onClick={onClickTheme}><Icons.Theme/></IconButton>
          {
            !isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
          }
        </>
      }/>}
      isProcessing={isProcessing}
      spinner={<Spinner/>}
      className="pwapp-template-detail-page"
    >
      <Designer
        setRef={setFormRef}
        onChange={onUpdate}
        headerImage={template.headerImage}
        name={template.name}
        theme={template.theme}
        layout={template.layout}
        items={template.items}
        fieldItems={[
          { icon: <Icons.Text/>, itemType: 'text' },
          { icon: <Icons.TextInput/>, itemType: 'input' },
          { icon: <Icons.ComboBox/>, itemType: 'select' },
          { icon: <Icons.TextArea/>, itemType: 'textarea' },
          { icon: <Icons.Attachment/>, itemType: 'attachment' },
          { icon: <Icons.Rate/>, itemType: 'rating' },
        ]}
        statisticItems={[
          { icon: <Icons.PieChart/>, itemType: 'pie-chart' },
          { icon: <Icons.LineChart/>, itemType: 'line-chart' },
        ]}
      />
      <ConfirmModal
        modalType={modalType}
        onCloseModal={onCloseModal}
        onCancel={onCancel}
        onDelete={onDelete}
      />
      {
        modalType === 'theme' && (
          <PaperThemeModal
            onClose={onCloseModal}
            onChoseColor={onChoseThemeColor}
            onChangeImage={onChoseHeaderImage}
          />
        )
      }
    </BaseTemplate>
  );
};

export default TemplateDetailPage;

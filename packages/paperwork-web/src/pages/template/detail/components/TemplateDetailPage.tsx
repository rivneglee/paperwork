import React, { FunctionComponent, useState } from 'react';
import htmlToImage from 'html-to-image';
import {
  BaseTemplate,
  Icons,
  FormProps,
  IconButton,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer } from '../../../../components/FormDesigner';
import { TextInput, Combobox } from '../../../../components/FormItems';
import { ConfirmModal } from '../../../../components/Modal';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isPageEdited: boolean;
  onUpdate: (formProps: FormProps) => void;
  onCancel: () => void;
  onSave: (template: TemplateDetail, thumbnail: string) => void;
  onDelete: () => void;
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

  const onClickSave = async () => {
    const img = await htmlToImage.toPng(formRef, { quality: 0.1 });
    onSave(template, img);
  };

  return (
    <BaseTemplate
      header={<AppBar activeMenuId="templates" secondaryMenu={
        <>
          <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
          <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
          <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
        </>
      }/>}
      isProcessing={isProcessing}
      spinner={<Spinner/>}
      className="pwapp-template-detail-page"
    >
      <Designer
        setRef={setFormRef}
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
      { modalType && (
        <ConfirmModal
          modalType={modalType}
          onCloseModal={onCloseModal}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      )}
    </BaseTemplate>
  );
};

export default TemplateDetailPage;

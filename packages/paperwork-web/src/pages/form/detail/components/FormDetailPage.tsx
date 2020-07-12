import React, { FunctionComponent, useState } from 'react';
import { BaseTemplate, FormMode, FormThemeColors, IconButton, Icons } from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './FormDetailPage.scss';
import { FormDetail } from '../../../../schema/Form';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer, PaperThemeModal } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';
import { getInputMap, getLayoutMap, getButtonMap, InputItemTypes, ButtonItemTypes } from '../../../../components/FormAddons';

interface Props {
  form: FormDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
  onUpdate: (template: FormDetail) => void;
  onCancel: () => void;
  onSave: (template: FormDetail) => void;
  onDelete: () => void;
}

const FormDetailPage: FunctionComponent<Props> = ({
  form,
  isPageEdited,
  isProcessing,
  isCreating,
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
  const [modalType, setModalType] = useState('');
  const [mode, setMode] = useState(FormMode.DESIGN);

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
    onSave(form);
  };

  const onChoseThemeColor = (theme: FormThemeColors) => {
    onUpdate({
      ...form,
      theme,
    });
  };

  const onChoseHeaderImage = (headerImage: string) => {
    onUpdate({
      ...form,
      headerImage,
    });
  };

  const designMenu = (
    <>
      <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
      <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
      <IconButton onClick={() => setMode(FormMode.EDIT)}><Icons.Preview/></IconButton>
      <IconButton onClick={onClickTheme}><Icons.Theme/></IconButton>
      {
        !isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
      }
    </>
  );

  const previewMenu = (
    <IconButton onClick={() => setMode(FormMode.DESIGN)}><Icons.Cancel/></IconButton>
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
      className="pwapp-template-detail-page"
      header={<AppBar activeMenuId="forms" secondaryMenu={
        mode === FormMode.DESIGN ? designMenu : previewMenu
      }/>}
    >
      {
        mode === FormMode.DESIGN ? (
          <Designer
            onChange={onUpdate}
            headerImage={form.headerImage}
            itemMetadataMap={{
              ...getInputMap(),
              ...getButtonMap(),
            }}
            layoutComponentMap={getLayoutMap()}
            name={form.name}
            theme={form.theme}
            layout={form.layout}
            items={form.items}
            fieldItems={[
              { icon: <Icons.Text/>, itemType: InputItemTypes.RICH_TEXT },
              { icon: <Icons.TextInput/>, itemType: InputItemTypes.TEXT_INPUT },
              { icon: <Icons.ComboBox/>, itemType: InputItemTypes.COMBOBOX },
              { icon: <Icons.TextArea/>, itemType: 'textarea' },
              { icon: <Icons.Attachment/>, itemType: 'attachment' },
              { icon: <Icons.Rate/>, itemType: 'rating' },
            ]}
            buttonItems={[
              { icon: <Icons.Submit/>, itemType: ButtonItemTypes.SUBMIT },
            ]}
            statisticItems={[
              { icon: <Icons.PieChart/>, itemType: 'pie-chart' },
              { icon: <Icons.LineChart/>, itemType: 'line-chart' },
            ]}
          />
        ) : (
          <></>
        )
      }
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

export default FormDetailPage;

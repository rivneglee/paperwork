import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  Drawer,
  FormMode,
  FormThemeColors,
  IconButton,
  Icons,
  Scrollable,
  Toggle,
} from '@paperwork/ui-widgets';

import AppBar from '../../../../components/AppBar';

import './TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer, PaperThemeModal } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';
import {
  getInputMap,
  getLayoutMap,
  getButtonMap,
  getExpressionMap,
  InputItemTypes,
  ButtonItemTypes, ExpressionItemTypes,
} from '../../../../components/FormAddons';
import Preview from './Preview';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
  isPublic: boolean;
  isReadOnly: boolean;
  onUpdate: (template: TemplateDetail) => void;
  onCancel: () => void;
  onSave: (template: TemplateDetail) => void;
  onDelete: () => void;
}

const TemplateDetailPage: FunctionComponent<Props> = ({
  template,
  isPageEdited,
  isProcessing,
  isCreating,
  isPublic,
  isReadOnly,
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
  const [modalType, setModalType] = useState('');
  const [mode, setMode] = useState(FormMode.DESIGN);
  const [showDrawer, setShowDrawer] = useState(false);
  const onCloseModal = () => setModalType('');

  const onOpenDrawer = () => setShowDrawer(true);

  const onCloseDrawer = () => setShowDrawer(false);

  const onClickCancel = () => {
    if (mode === FormMode.DESIGN) {
      if (isPageEdited) {
        setModalType('unsave');
      } else {
        onCancel();
      }
    } else {
      setMode(FormMode.DESIGN);
    }
  };

  const onClickDelete = () => setModalType('delete');

  const onClickTheme = () => setModalType('theme');

  const onClickSave = async () => {
    onSave(template);
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

  const onPublicToggleChange = (e: any) => {
    const visibility = e.target.checked ? 'public' : 'private';
    onUpdate({
      ...template,
      visibility,
    });
  };

  const designMenu = (
    <>
      <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
      { mode === FormMode.DESIGN && !isReadOnly && (
        <>
          <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
          <IconButton onClick={() => setMode(FormMode.EDIT)}><Icons.Preview/></IconButton>
          <IconButton onClick={onOpenDrawer}><Icons.Settings/></IconButton>
          <IconButton onClick={onClickTheme}><Icons.Theme/></IconButton>
          {!isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>}
        </>)
      }
    </>
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
      className="pwapp-template-detail-page"
      header={<AppBar activeMenuId="templates" secondaryMenu={designMenu}/>}
    >
      {
        mode === FormMode.DESIGN && !isReadOnly ? (
          <Designer
            onChange={onUpdate}
            headerImage={template.headerImage}
            itemMetadataMap={{
              ...getInputMap(),
              ...getButtonMap(),
              ...getExpressionMap({ items: { ...template.items } }),
            }}
            layoutComponentMap={getLayoutMap()}
            name={template.name}
            theme={template.theme}
            layout={template.layout}
            items={template.items}
            fieldItems={[
              { icon: <Icons.Text/>, itemType: InputItemTypes.RICH_TEXT },
              { icon: <Icons.TextInput/>, itemType: InputItemTypes.TEXT_INPUT },
              { icon: <Icons.ComboBox/>, itemType: InputItemTypes.COMBOBOX },
              { icon: <Icons.TextArea/>, itemType: 'textarea' },
              { icon: <Icons.Attachment/>, itemType: 'attachment' },
              { icon: <Icons.Formula/>, itemType: ExpressionItemTypes.FORMULA },
            ]}
            buttonItems={[
              { icon: <Icons.Submit/>, itemType: ButtonItemTypes.SUBMIT },
            ]}
          />
        ) : (
          <Preview template={template}/>
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
      <Drawer
        placement="right"
        header={<h3>Template Settings</h3>}
        isShow={showDrawer}
        onClose={onCloseDrawer}
      >
        <Scrollable className="pwapp-form-settings">
          <Toggle
            checked={isPublic}
            label="Make it public"
            labelPlacement="top"
            onChange={onPublicToggleChange}
          />
        </Scrollable>
      </Drawer>
    </BaseTemplate>
  );
};

export default TemplateDetailPage;

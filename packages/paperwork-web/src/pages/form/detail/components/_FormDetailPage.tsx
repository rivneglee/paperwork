import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  DatePicker,
  Drawer,
  FormThemeColors,
  IconButton,
  Icons,
  Input,
  Scrollable,
} from '@paperwork/ui-widgets';

import './_FormDetailPage.scss';
import { FormDetail } from '../../../../schema/Form';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer, PaperThemeModal } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';
import {
  ButtonItemTypes,
  getButtonMap,
  getInputMap,
  getLayoutMap,
  InputItemTypes,
} from '../../../../components/FormAddons';
import Toolbox from '../../../../lite/Toolbox/Toolbox';
import AppBar from '../../../../lite/AppBar/AppBar';

interface Props {
  form: FormDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
  isCreatingDefaultDs: boolean;
  isPublic: boolean;
  onUpdate: (template: FormDetail) => void;
  onCancel: () => void;
  onSave: (template: FormDetail) => void;
  onDelete: () => void;
}

const FormDetailPage: FunctionComponent<Props> = ({
  form,
  isPageEdited,
  isProcessing,
  isPublic,
  isCreating,
  isCreatingDefaultDs,
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
  const [modalType, setModalType] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);

  const onCloseModal = () => setModalType('');

  const onClickCancel = () => {
    if (isPageEdited) {
      setModalType('unsave');
    } else {
      onCancel();
    }
  };

  const onClickDelete = () => setModalType('delete');

  const onOpenDrawer = () => setShowDrawer(true);

  const onCloseDrawer = () => setShowDrawer(false);

  const onClickSave = async () => {
    onSave(form);
  };

  const onUpdateSettings = (key: string, value: any) => {
    onUpdate({
      ...form,
      [key]: value,
    });
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
      <IconButton onClick={onOpenDrawer}><Icons.Settings/></IconButton>
      {
        !isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
      }
    </>
  );

  const onUpdateSucceedMessage = (key: string, value: string) => {
    const { succeedMessage } = form;
    onUpdate({
      ...form,
      succeedMessage: {
        ...succeedMessage,
        [key]: value,
      },
    });
  };

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner type="donut"/>}
      className="pwapp-lite-template-detail-page"
      header={<AppBar secondaryMenu={designMenu}/>}
    >
      <Designer
        onChange={onUpdate}
        headerImage={form.headerImage}
        itemMetadataMap={{
          ...getInputMap({ enableDataBinding: !isCreatingDefaultDs, isCreatingDs: isCreatingDefaultDs }),
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
        ]}
        buttonItems={[
          { icon: <Icons.Submit/>, itemType: ButtonItemTypes.SUBMIT },
        ]}
        statisticItems={[
          { icon: <Icons.PieChart/>, itemType: 'pie-chart' },
          { icon: <Icons.LineChart/>, itemType: 'line-chart' },
        ]}
        toolbox={
          <Toolbox
            fieldItems={[
              { icon: <Icons.Text/>, itemType: InputItemTypes.RICH_TEXT },
              { icon: <Icons.TextInput/>, itemType: InputItemTypes.TEXT_INPUT },
              { icon: <Icons.ComboBox/>, itemType: InputItemTypes.COMBOBOX },
            ]}
            buttonItems={[
              { icon: <Icons.Submit/>, itemType: ButtonItemTypes.SUBMIT },
            ]}
            statisticItems={[
              { icon: <Icons.PieChart/>, itemType: 'pie-chart' },
              { icon: <Icons.LineChart/>, itemType: 'line-chart' },
            ]}
          />
        }
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
      <Drawer
        placement="right"
        header={<h3>Form Settings</h3>}
        isShow={showDrawer}
        onClose={onCloseDrawer}
      >
        <Scrollable className="pwapp-form-settings">
          <DatePicker
            label="Close date"
            labelPlacement="top"
            value={form.closeDate}
            onChange={(date: string) => onUpdateSettings('closeDate', date)}
          />
          <Input
            size="s"
            label="Target commits"
            labelPlacement="top"
            value={form.targetCommits}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
            }}
            onChange={(e: any) => onUpdateSettings('targetCommits', e.target.value)}
          />
          <Input
            size="s"
            label="Max commits"
            labelPlacement="top"
            value={form.maxCommits}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
            }}
            onChange={(e: any) => onUpdateSettings('maxCommits', e.target.value)}
          />
          <Input
            size="s"
            label="Succeed title"
            labelPlacement="top"
            value={form.succeedMessage.title}
            onChange={(e: any) => onUpdateSucceedMessage('title', e.target.value)}
          />
          <Input
            size="s"
            label="Succeed message"
            labelPlacement="top"
            value={form.succeedMessage.subTitle}
            onChange={(e: any) => onUpdateSucceedMessage('subTitle', e.target.value)}
          />
        </Scrollable>
      </Drawer>
    </BaseTemplate>
  );
};

export default FormDetailPage;

import React, { FunctionComponent, useState } from 'react';
import { BaseTemplate, FormMode, IconButton, Icons } from '@paperwork/ui-widgets';

import './_TemplateDetailPage.scss';
import { TemplateDetail } from '../../../../schema/Template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';
import { getInputMap, getLayoutMap, getButtonMap, InputItemTypes, ButtonItemTypes } from '../../../../components/FormAddons';
import Preview from './Preview';
import AppBar from '../../../../lite/AppBar/AppBar';
import Toolbox from '../../../../lite/Toolbox/Toolbox';

interface Props {
  template: TemplateDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
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
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
  const [modalType, setModalType] = useState('');
  const [mode] = useState(FormMode.DESIGN);

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
    onSave(template);
  };

  const designMenu = (
    <>
      <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
      <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
      {
        !isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
      }
    </>
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner type="donut"/>}
      className="pwapp-template-detail-page"
      header={<AppBar secondaryMenu={designMenu}/>}
    >
      {
        mode === FormMode.DESIGN ? (
          <Designer
            onChange={onUpdate}
            headerImage={template.headerImage}
            itemMetadataMap={{
              ...getInputMap(),
              ...getButtonMap(),
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
    </BaseTemplate>
  );
};

export default TemplateDetailPage;

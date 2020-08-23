import React, { FunctionComponent, useState } from 'react';
import {
  BaseTemplate,
  FormThemeColors,
  IconButton,
  Icons,
} from '@paperwork/ui-widgets';

import Toolbox from '../../../../lite/Toolbox/Toolbox';
import AppBar from '../../../../lite/AppBar/AppBar';

import './ReportDetailPage.scss';
import { ReportDetail } from '../../../../schema/Report';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Designer, PaperThemeModal } from '../../../../components/FormDesigner';
import { ConfirmModal } from '../../../../components/Modal';
import {
  getLayoutMap,
  getStatisticMap,
} from '../../../../components/FormAddons';

interface Props {
  report: ReportDetail;
  isProcessing?: boolean;
  isCreating: boolean;
  isPageEdited: boolean;
  onUpdate: (report: ReportDetail) => void;
  onCancel: () => void;
  onSave: (report: ReportDetail) => void;
  onDelete: () => void;
}

const ReportDetailPage: FunctionComponent<Props> = ({
  report,
  isPageEdited,
  isProcessing,
  isCreating,
  onUpdate,
  onCancel,
  onDelete,
  onSave,
}) => {
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
    onSave(report);
  };

  const onChoseThemeColor = (theme: FormThemeColors) => {
    onUpdate({
      ...report,
      theme,
    });
  };

  const onChoseHeaderImage = (headerImage: string) => {
    onUpdate({
      ...report,
      headerImage,
    });
  };

  const designMenu = (
    <>
      <IconButton onClick={onClickCancel}><Icons.Cancel/></IconButton>
      <IconButton onClick={onClickSave}><Icons.Save/></IconButton>
      <IconButton onClick={onClickTheme}><Icons.Theme/></IconButton>
      {
        !isCreating && <IconButton onClick={onClickDelete}><Icons.Delete/></IconButton>
      }
    </>
  );

  return (
    <BaseTemplate
      isProcessing={isProcessing}
      spinner={<Spinner/>}
      className="pwapp-report-detail-page"
      header={<AppBar activeMenuId="reports" secondaryMenu={designMenu}/>}
    >
      <Designer
        onChange={onUpdate}
        headerImage={report.headerImage}
        itemMetadataMap={getStatisticMap()}
        layoutComponentMap={getLayoutMap()}
        name={report.name}
        theme={report.theme}
        layout={report.layout}
        items={report.items}
        statisticItems={[
          { icon: <Icons.Table/>, itemType: 'data-table' },
          { icon: <Icons.PieChart/>, itemType: 'pie-chart' },
          { icon: <Icons.LineChart/>, itemType: 'line-chart' },
        ]}
        toolbox={
          <Toolbox
            statisticItems={[
              { icon: <Icons.Table/>, itemType: 'data-table' },
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
    </BaseTemplate>
  );
};

export default ReportDetailPage;

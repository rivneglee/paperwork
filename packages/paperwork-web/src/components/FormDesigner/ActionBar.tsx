import React, { FunctionComponent, ReactElement } from 'react';
import { Avater, DragAndDropType, Icons, LaunchPad, ToolkitItem } from '@paperwork/ui-widgets';

export interface FormItemProps {
  label?: string;
  icon: ReactElement;
  itemType: string;
}

interface Props {
  fieldItems: FormItemProps[];
  statisticItems: FormItemProps[];
}

export enum LayoutItemTypes {
  VERTICAL_LIST = 'vertical-list', HORIZONTAL_LIST = 'horizontal-list',
}

const ActionBar: FunctionComponent<Props> = ({ fieldItems, statisticItems }) => (
  <div className="pwapp-designer-action-bar">
    <LaunchPad placement="right" itemPerRow={3} useOverlay={true} renderTrigger={() => (
      <Avater
        size="large"
        shadow
        className="pwapp-designer-action-bar__action">
        <Icons.Layout/>
      </Avater>
    )}>
      <ToolkitItem id={LayoutItemTypes.VERTICAL_LIST} type={DragAndDropType.LAYOUT}>
        <LaunchPad.Item><Icons.Rows/></LaunchPad.Item>
      </ToolkitItem>
      <ToolkitItem id={LayoutItemTypes.HORIZONTAL_LIST} type={DragAndDropType.LAYOUT}>
        <LaunchPad.Item><Icons.Columns/></LaunchPad.Item>
      </ToolkitItem>
    </LaunchPad>
    <LaunchPad placement="right" itemPerRow={3} useOverlay={true} renderTrigger={() => (
      <Avater
        size="large"
        shadow
        className="pwapp-designer-action-bar__action pwapp-designer-action-bar__action--green">
        <Icons.Control/>
      </Avater>
    )}>
      {
        fieldItems.map(item => (
          <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
            <LaunchPad.Item label={item.label}>{item.icon}</LaunchPad.Item>
          </ToolkitItem>
        ))
      }
    </LaunchPad>
    <LaunchPad placement="right" itemPerRow={3} useOverlay={true} renderTrigger={() => (
      <Avater
        size="large"
        shadow
        className="pwapp-designer-action-bar__action pwapp-designer-action-bar__action--blue">
        <Icons.Chart/>
      </Avater>
    )}>
      {
        statisticItems.map(item => (
          <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
            <LaunchPad.Item label={item.label}>{item.icon}</LaunchPad.Item>
          </ToolkitItem>
        ))
      }
    </LaunchPad>
  </div>
);

export default ActionBar;
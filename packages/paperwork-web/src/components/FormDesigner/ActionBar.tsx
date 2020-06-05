import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { Avater, DragAndDropType, Icons, LaunchPad, ToolkitItem } from '@paperwork/ui-widgets';

export interface ToolkitItemProps {
  label?: string;
  icon: ReactElement;
  itemType: string;
}

interface Props {
  toolkitItems: ToolkitItemProps[];
  onChangeTheme?: (theme: string) => void;
}

const themeColors = [
  'pink', 'red', 'purple', 'indigo', 'blue', 'cyan',
  'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange', 'brown',
];

const ActionBar: FunctionComponent<Props> = ({ toolkitItems, onChangeTheme }) => (
  <div className="pwapp-designer-action-bar">
    <LaunchPad placement="right" itemPerRow={3} useOverlay={true} renderTrigger={() => (
      <Avater
        size="large"
        shadow
        className="pwapp-designer-action-bar__action">
        <Icons.Layout/>
      </Avater>
    )}>
      <ToolkitItem id="simple-list" type={DragAndDropType.LAYOUT}>
        <LaunchPad.Item><Icons.List/></LaunchPad.Item>
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
        toolkitItems.map(item => (
          <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
            <LaunchPad.Item label={item.label}>{item.icon}</LaunchPad.Item>
          </ToolkitItem>
        ))
      }
    </LaunchPad>
    <LaunchPad placement="right" itemPerRow={4} useOverlay={true} renderTrigger={() => (
      <Avater
        size="large"
        shadow
        className="pwapp-designer-action-bar__action pwapp-designer-action-bar__action--blue">
        <Icons.Theme/>
      </Avater>
    )}>
      {
        themeColors.map(theme => (
          <LaunchPad.Item
            key={theme}
            className={classNames('pwapp-designer-theme', `pwapp-designer-theme--${theme}`)}
            onClick={() => onChangeTheme && onChangeTheme(theme)}
          />
        ))
      }
      <LaunchPad.Item
        className={classNames('pwapp-designer-theme', 'pwapp-designer-theme--none')}
        onClick={() => onChangeTheme && onChangeTheme('')}
      >
        <Icons.None/>
      </LaunchPad.Item>
    </LaunchPad>
  </div>
);

export default ActionBar;

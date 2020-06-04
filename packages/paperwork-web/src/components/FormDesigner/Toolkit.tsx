import React, { FunctionComponent } from 'react';
import { LaunchPad, ToolkitItem, DragAndDropType, Icons } from '@paperwork/ui-widgets';

interface Props {}

const Toolkit: FunctionComponent<Props> = () => (
  <LaunchPad>
    <ToolkitItem id="report" type={DragAndDropType.ITEM}>
      <LaunchPad.Item><Icons.Chart/></LaunchPad.Item>
    </ToolkitItem>
    <ToolkitItem id="form" type={DragAndDropType.ITEM}>
      <LaunchPad.Item><Icons.Form/></LaunchPad.Item>
    </ToolkitItem>
    <ToolkitItem id="menu" type={DragAndDropType.LAYOUT}>
      <LaunchPad.Item><Icons.Menu/></LaunchPad.Item>
    </ToolkitItem>
    <ToolkitItem id="ds" type={DragAndDropType.LAYOUT}>
      <LaunchPad.Item><Icons.DataSource/></LaunchPad.Item>
    </ToolkitItem>
    <LaunchPad.Item><Icons.Template/></LaunchPad.Item>
    <LaunchPad.Item><Icons.QuestionMark/></LaunchPad.Item>
    <LaunchPad.Item><Icons.Info/></LaunchPad.Item>
    <LaunchPad.Item><Icons.PowerOff/></LaunchPad.Item>
  </LaunchPad>
);

export default Toolkit;

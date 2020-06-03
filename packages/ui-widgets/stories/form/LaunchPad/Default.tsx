import React from 'react';

import { LaunchPad, Icons } from '../../../src';

export default () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600 }}>
    <LaunchPad>
      <LaunchPad.Item label="Report"><Icons.Chart/></LaunchPad.Item>
      <LaunchPad.Item label="Form"><Icons.Form/></LaunchPad.Item>
      <LaunchPad.Item label="Menu"><Icons.Menu/></LaunchPad.Item>
      <LaunchPad.Item label="Datasource"><Icons.DataSource/></LaunchPad.Item>
      <LaunchPad.Item label="Template"><Icons.Template/></LaunchPad.Item>
      <LaunchPad.Item label="Question"><Icons.QuestionMark/></LaunchPad.Item>
      <LaunchPad.Item label="Help"><Icons.Info/></LaunchPad.Item>
      <LaunchPad.Item label="Power off"><Icons.PowerOff/></LaunchPad.Item>
    </LaunchPad>
  </div>
);

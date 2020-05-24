import React from 'react';

import { IconButton, Card, PictureChip, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card>
      <PictureChip
        size="l"
        color="blue-grey"
        title="College Activity"
        subTitle="End date: 08/08/2023"
        imageUrl="https://gd-templates.jinshujufiles.com/template_market/clv9pW-preview-2a6da4c7-cb84-4a5b-ae28-306f398f7fa8.jpg"
        content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
        footer={
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
            <IconButton><Icons.Duplicate/></IconButton>
            <IconButton><Icons.Info/></IconButton>
            <IconButton><Icons.Trash/></IconButton>
          </div>
        }
      />
    </Card>
  </div>
);

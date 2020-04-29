import React from 'react';

import { BaseTemplate, Button, Card, PageState } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem', display: 'flex', justifyContent: 'center', height: '100hv' }}>
    <BaseTemplate>
      <Card>
        <PageState
          image="https://feelix-assets.s3-ap-southeast-2.amazonaws.com/page-state/empty-state/something-went-wrong.svg"
          title="No result found"
          description="Please change your filter or create some data"
          buttons={[
            <Button color="primary" type="link">Retry</Button>,
            <Button color="primary" type="link">Create some data</Button>,
          ]}
        />
      </Card>
    </BaseTemplate>
  </div>
);

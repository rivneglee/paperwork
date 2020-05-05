import React from 'react';

import { Button, Card, Icons } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={<h3>Button types</h3>}>
      <Button>
        Default
      </Button>
      <Button shadow>
        Shadow
      </Button>
      <Button type="outlined">
        Outlined
      </Button>
      <Button type="text">
        Text
      </Button>
      <Button type="link">
        Link
      </Button>
    </Card>
    <Card header={<h3>Button states</h3>}>
      <Button disabled>
        Disabled
      </Button>
      <Button disabled type="outlined">
        Disabled
      </Button>
      <Button disabled type="text">
        Disabled
      </Button>
      <Button disabled type="link">
        Disabled
      </Button>
    </Card>
    <Card header={<h3>Button colours</h3>}>
      <Button color="primary">
        Primary
      </Button>
      <Button color="primary" type="outlined">
        Primary
      </Button>
      <Button color="primary" type="text">
        Primary
      </Button>
      <Button color="primary" type="link">
        Primary
      </Button>
      <Button color="secondary">
        Secondary
      </Button>
      <Button color="secondary" type="outlined">
        Secondary
      </Button>
      <Button color="secondary" type="text">
        Secondary
      </Button>
      <Button color="secondary" type="link">
        Secondary
      </Button>
      <Button color="danger">
        Danger
      </Button>
      <Button color="danger" type="outlined">
        Danger
      </Button>
      <Button color="danger" type="text">
        Danger
      </Button>
      <Button color="danger" type="link">
        Danger
      </Button>
    </Card>
    <Card header={<h3>Button sizes</h3>}>
      <Button color="primary" size="xs" type="outlined">
        XS
      </Button>
      <Button color="primary" size="s" type="outlined">
        S
      </Button>
      <Button color="primary" size="m" type="outlined">
        M
      </Button>
      <Button color="primary" size="l" type="outlined">
        L
      </Button>
      <Button color="primary" size="xl" type="outlined">
        XL
      </Button>
    </Card>
    <Card header={<h3>Button icons</h3>}>
      <Button color="primary" icon={<Icons.Chart />}>
        Left icon
      </Button>
      <Button color="primary" icon={<Icons.Form />} iconPlacement="right">
        Right icon
      </Button>
    </Card>
  </div>
);

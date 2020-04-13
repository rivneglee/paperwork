import React from 'react';

import { Card, Scrollable, Icons, List } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
    <Card header={
      <h3>Beautiful scroll bar</h3>
    }>
      <Scrollable>
        <List>
          {
            Array.from({ length: 10 }).map(() => (
              <>
                <List.Item onClick={close} icon={<Icons.Form/>}>
                  Forms
                </List.Item>
                <List.Item onClick={close} icon={<Icons.Chart/>}>
                  Reports
                </List.Item>
              </>
            ))
          }
        </List>
      </Scrollable>
    </Card>
  </div>
);

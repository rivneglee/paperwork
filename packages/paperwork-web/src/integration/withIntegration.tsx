import * as React from 'react';
import { Integration } from './types';
import Provider from './Provider';

export default (CompositeComponent: React.ComponentType<any>, mappings: any) => (props: any) => {
  return (
    <Provider mappings={mappings}>
      {
        (integration: Integration) => (
          <CompositeComponent integration={integration} {...props} />
        )
      }
    </Provider>
  );
};

import * as React from 'react';
import { Integration } from './types';
import Provider from './Provider';

export default (CompositeComponent: React.ComponentType<any>, mappings: any) => (props: any) => {
  const { spinner, ...restProps } = props;
  return (
    <Provider mappings={mappings} spinner={spinner}>
      {
        (integration: Integration, isProcessing) => (
          <CompositeComponent integration={integration} isProcessing={isProcessing} {...restProps} />
        )
      }
    </Provider>
  );
};

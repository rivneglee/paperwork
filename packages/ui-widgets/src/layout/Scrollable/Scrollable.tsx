import React, { FunctionComponent } from 'react';

import ScrollBars from 'react-custom-scrollbars';

interface Props {
  className?: string;
}

const Scrollable: FunctionComponent<Props> = ({
 children, className = '',
}) => (
  <div className={`pw-scrollable ${className}`}>
    <ScrollBars>
      {children}
    </ScrollBars>
  </div>
);

export default Scrollable;

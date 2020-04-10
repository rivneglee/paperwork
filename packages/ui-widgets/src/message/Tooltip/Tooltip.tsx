import React, { ReactComponentElement, FunctionComponent } from 'react';
import ReactTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

interface Props {
  placement?: 'left' | 'right' | 'top' | 'bottom';
  content: ReactComponentElement<any> | string;
}

const Tooltip: FunctionComponent<Props> = ({
 children,
 placement = 'left',
 content,
}) => (
  <ReactTooltip
    placement={placement}
    overlay={content}
    overlayClassName="pw-tooltip__overlay"
    trigger={[
      'hover',
      'focus',
      'click',
    ]}
  >
    <span>
     {children}
    </span>
  </ReactTooltip>
);

export default Tooltip;

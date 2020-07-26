import React, { ReactComponentElement, FunctionComponent } from 'react';
import ReactTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

interface Props {
  placement?: 'left' | 'right' | 'top' | 'bottom';
  content?: ReactComponentElement<any> | string;
  onVisibleChange?: (isVisible?: boolean) => void;
}

const Tooltip: FunctionComponent<Props> = ({
 children,
 placement = 'left',
 content,
 onVisibleChange,
}) => (
  content ? (
    <ReactTooltip
      afterVisibleChange={onVisibleChange}
      placement={placement}
      overlay={content}
      overlayClassName="pw-tooltip__overlay"
      trigger={[
        'hover',
        'focus',
        'click',
      ]}
    >
    <span className="pw-tooltip__trigger">
     {children}
    </span>
    </ReactTooltip>
  ) : <>{children}</>
);

export default Tooltip;

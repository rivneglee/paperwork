import React, { FunctionComponent } from 'react';

import ScrollBars from 'react-custom-scrollbars';

interface Props {
  className?: string;
  setRef?: (ref: any) => void;
}

const Scrollable: FunctionComponent<Props> = ({
 children, className = '', setRef,
}) => {
  const setParentRef = (ref: any) => {
    if (ref && setRef) {
      setRef(ref.firstChild.firstChild);
    }
  };

  return (
    <div className={`pw-scrollable ${className}`} ref={setParentRef}>
      <ScrollBars autoHide>
        {children}
      </ScrollBars>
    </div>
  );
};

export default Scrollable;

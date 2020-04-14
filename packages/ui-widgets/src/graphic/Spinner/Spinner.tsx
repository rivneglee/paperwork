import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface Props {
  title?: string;
  type?: 'box' | 'donut' | 'ellipsis';
  size?: 's' | 'm' | 'l';
}

const Box: FunctionComponent = () => (
  <div className="pw-spinner-waterbox__box">
    <span className="pw-spinner-waterbox__inner"></span>
  </div>
);

const Donut: FunctionComponent = () => (
  <div className="pw-spinner-donut__donut"></div>
);

const Ellipsis: FunctionComponent = () => (
  <div className="pw-spinner-ellipsis">
    <span className="pw-spinner-ellipsis__dot"></span>
    <span className="pw-spinner-ellipsis__dot"></span>
    <span className="pw-spinner-ellipsis__dot"></span>
  </div>
);

const Spinner: FunctionComponent<Props> = ({
  title = 'LOADING',
  type = 'box',
  size = 'm',
}) => (
  <div className="pw-spinner">
    <div className={classNames(
      'pw-spinner__animation',
      size && `pw-spinner__animation--size-${size}`,
    )}>
      { type === 'box' && <Box /> }
      { type === 'donut' && <Donut /> }
      { type === 'ellipsis' && <Ellipsis /> }
    </div>
    <div className="pw-spinner__text">{title}</div>
  </div>
);

export default Spinner;

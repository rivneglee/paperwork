import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import Button from '../../form/Button/Button';
import Icons from '../../graphic/Icons';

interface Props {
  message: string;
  onRemove?: () => void;
  canRemove?: boolean;
  className?: string;
}

const Placeholder: FunctionComponent<Props> = ({
  message,
  onRemove,
  className,
  canRemove = true,
}) => (
  <div className={classNames('pw-dnd-layout-placeholder', className)}>
    <span className="pw-dnd-layout-placeholder_message">
      {message} {canRemove && 'OR'}
    </span>
    {
      canRemove && (
        <Button
          className="pw-dnd-layout-placeholder_button"
          type="link"
          color="primary"
          iconPlacement="right"
          icon={<Icons.Delete/>}
          onClick={onRemove}
        >
          Remove
        </Button>
      )
    }
  </div>
);

export default Placeholder;

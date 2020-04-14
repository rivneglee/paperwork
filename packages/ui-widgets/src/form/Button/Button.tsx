import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import classNames from 'classnames';

interface Props {
  icon?: ReactElement;
  iconPlacement?: 'left' | 'right';
  onClick?: (e: SyntheticEvent) => void;
  type?: 'outlined' | 'text' | 'link';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  color?: 'primary' | 'secondary';
  shadow?: boolean;
  className?: string;
  disabled?: boolean;
}

const Button: FunctionComponent<Props> = ({
  children,
  onClick,
  shadow,
  type,
  color,
  size,
  className,
  disabled,
  icon,
  iconPlacement = 'left',
}) => (
  <button disabled={disabled} className={classNames(
    'pw-button',
    shadow && 'pw-button--shadow',
    type && `pw-button--${type}`,
    color && `pw-button--color-${color}`,
    size && `pw-button--size-${size}`,
    disabled && 'pw-button--disabled',
    icon && iconPlacement === 'right' && 'pw-button--reversed',
    className && className,
  )} onClick={onClick}>
    {icon && <span className={classNames(
      'pw-button__icon',
      `pw-button__icon--${iconPlacement}`,
    )}>{icon}</span>}
    <span>{children}</span>
  </button>
);

export default Button;

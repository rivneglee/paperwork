import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './LabelAccessor.scss';

interface Props {
  label: string;
  labelPlacement?: 'top' | 'bottom' | 'right' | 'left';
  isRequired?: boolean;
}

const LabelAccessor: FunctionComponent<Props> = ({
  label,
  labelPlacement = 'top',
  isRequired = false,
  children,
}) => (
  <div className={
    classNames('pwapp-form-label-accessor', `pwapp-form-label-accessor--${labelPlacement}`)
  }>
    <div
      className={
        classNames(
          'pwapp-form-label-accessor__label',
          isRequired && 'pwapp-form-label-accessor__label--required',
        )
      }
    >
      {label}
    </div>
    <div>{children}</div>
  </div>
);

export default LabelAccessor;

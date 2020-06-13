import React, { ReactElement, SyntheticEvent } from 'react';
import Cleave from 'cleave.js/react';
import classNames from 'classnames';

import { FieldGroup } from '../FieldGroup';

interface Props {
  value?: string | number;
  label?: ReactElement | string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  labelPlacement?: 'left' | 'top';
  onChange?: (e: SyntheticEvent) => void;
  onKeyDown?: (e: SyntheticEvent) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  placeholder?: string;
  options?: object;
  type?: 'outlined' | 'underlined';
  left?: ReactElement;
  right?: ReactElement;
  className?: string;
}

class Input extends React.Component<Props> {
  state = {
    hasFocus: false,
  };

  private onInputFocus = () => this.setState({
    hasFocus: true,
  })

  private onInputBlur = () => this.setState({
    hasFocus: false,
  })

  render() {
    const {
      type = 'outlined',
      label,
      isRequired,
      labelAccessory,
      labelPlacement,
      options,
      size,
      left,
      right,
      className,
      value = '',
      ...otherProps
    } = this.props;

    const { hasFocus } = this.state;
    const inputProps = {
      value,
      ...otherProps,
      className: 'pw-input__control',
      onFocus: this.onInputFocus,
      onBlur: this.onInputBlur,
    };

    const inputView = options ? (
      <Cleave
        {...inputProps}
        options={options}
      />
    ) : <input {...inputProps} />;

    return (
      <FieldGroup
        label={label}
        isRequired={isRequired}
        labelAccessory={labelAccessory}
        size={size}
        labelPlacement={labelPlacement}
      >
        <div
          className={
            classNames(
              'pw-input',
              hasFocus && 'pw-input--active',
              type && `pw-input--type-${type}`,
              className,
            )
          }>
          {
            left && <span className="pw-input__left">{left}</span>
          }
          {inputView}
          {
            right && <span className="pw-input__right">{right}</span>
          }
        </div>
      </FieldGroup>
    );
  }
}

export default Input;

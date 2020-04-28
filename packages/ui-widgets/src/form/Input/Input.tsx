import React, { ReactElement, SyntheticEvent } from 'react';
import Cleave from 'cleave.js/react';
import classNames from 'classnames';

import { FieldGroup } from '../FieldGroup';

interface Props {
  value?: string | number;
  label?: ReactElement | string;
  disabled?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  onChange?: (e: SyntheticEvent) => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  placeholder?: string;
  options?: object;
  type?: 'outlined' | 'underlined';
  left?: ReactElement;
  right?: ReactElement;
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
      value,
      placeholder,
      label,
      isRequired,
      labelAccessory,
      disabled = false,
      options = {},
      onChange,
      size,
      left,
      right,
    } = this.props;

    const { hasFocus } = this.state;

    return (
      <FieldGroup label={label} isRequired={isRequired} labelAccessory={labelAccessory} size={size}>
        <div
          className={
            classNames(
              'pw-input',
              hasFocus && 'pw-input--active',
              type && `pw-input--type-${type}`,
            )
          }>
          {
            left && <span className="pw-input__left">{left}</span>
          }
          <Cleave
            className={
              classNames(
                'pw-input__control',
              )
            }
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            options={options}
            disabled={disabled}
          />
          {
            right && <span className="pw-input__right">{right}</span>
          }
        </div>
      </FieldGroup>
    );
  }
}

export default Input;

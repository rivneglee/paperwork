import React, { FunctionComponent } from 'react';
import Icons from '../../graphic/Icons';

export type CheckState = 'checked' | 'unchecked' | 'half-checked';

interface Props {
  value?: CheckState;
  label?: string;
  onChange?: (newValue: CheckState) => void;
  enableIntermediateState?: boolean;
}

export type CheckboxComponent = FunctionComponent<Props>;

const tuple2 = { checked: 'unchecked', unchecked: 'checked' };

const tuple3 = { checked: 'unchecked', 'half-checked': 'checked', unchecked: 'half-checked' };

const Checkbox: CheckboxComponent = ({
 value = 'unchecked',
 onChange,
 label = '',
 enableIntermediateState = false,
}) => {
  const handleStateChange = () => {
    const states = enableIntermediateState ? tuple3 : tuple2;
    const newState = states[value];
    onChange && onChange(newState);
  };

  return (
    <button className="pw-checkbox" onClick={handleStateChange}>
      {
        value === 'checked' && <Icons.SelectedAll className="pw-checkbox__input"/>
      }
      {
        value === 'half-checked' && <Icons.Selected className="pw-checkbox__input"/>
      }
      {
        value === 'unchecked' && <Icons.Unselected className="pw-checkbox__input"/>
      }
      <div className="pw-checkbox__label">
        {label}
      </div>
    </button>
  );
};

export default Checkbox;

import React, { FunctionComponent, ReactElement, useState } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import { Input } from '../Input';
import Icons from '../../graphic/Icons';

interface Props {
  value?: string | number;
  label?: ReactElement | string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  labelPlacement?: 'left' | 'top';
  onChange?: (date: string) => void;
  className?: string;
  format?: string;
}

const DatePicker: FunctionComponent<Props> = ({
  label,
  value,
  disabled,
  readOnly,
  isRequired,
  labelAccessory,
  labelPlacement,
  className,
  onChange,
  format = 'YYYY/MM/DD',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const handleOnFocus = () => {
    !readOnly && !disabled && setShowPicker(true);
  };
  const handleOnSelectDay = (date: Date) => {
    onChange && onChange(moment(date).format(format));
    setShowPicker(false);
  };
  const date = value ? new Date(value) : undefined;

  const dateModifier = {
    highlighted: date,
  };
  const handleOnBlur = (e: any) => {
    const inputDate = e.target.value;
    if (moment(inputDate).isValid()) {
      onChange && onChange(inputDate);
    }
  };
  return (
    <div className="pw-datepicker">
      <Input
        placeholder={format}
        onBlur={handleOnBlur}
        label={label}
        value={value}
        isRequired={isRequired}
        labelAccessory={labelAccessory}
        labelPlacement={labelPlacement}
        className={className}
        onFocus={handleOnFocus}
        disabled={disabled}
        readOnly={readOnly}
        right={<Icons.Calendar/>}
        options={{
          date: true,
          delimiter: '/',
          datePattern: ['Y', 'm', 'd'],
        }}
      />
      {
        showPicker && (
          <DayPicker
            onBlur={() => {
              setShowPicker(false);
            }}
            modifiers={dateModifier}
            month={date}
            onDayClick={handleOnSelectDay}
          />)
      }
    </div>
  );
};

export default DatePicker;

import React, { FunctionComponent, KeyboardEvent, SyntheticEvent } from 'react';
import classNames from 'classnames';

import { Input } from '../Input';
import Icons from '../../graphic/Icons';
import { Button } from '../Button';

interface Props {
  value?: string | number;
  onChange?: (e: SyntheticEvent) => void;
  onApply?: () => void;
  placeholder?: string;
  className?: string;
  applyButtonText?: string;
}

const Search: FunctionComponent<Props> = ({
  value,
  onChange,
  onApply,
  placeholder,
  className,
  applyButtonText = 'Apply',
}: Props) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13 && onApply) {
      onApply();
    }
  };
  return (
    <Input
      className={
        classNames(
          'pw-search',
          className,
        )
      }
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      left={<Icons.Search />}
      right={<Button onClick={onApply} className="pw-search__apply" type="link">{applyButtonText}</Button>}
    />
  );
};

export default Search;

import React, { FunctionComponent } from 'react';
import { Icons } from '@paperwork/ui-widgets';
import classNames from 'classnames';
import { InputItemTypes } from '../../index';

interface Props {
  fieldsMappings: object;
  mention: any;
  onClick?: (mention: any) => void;
}

const Variable: FunctionComponent<Props> = ({
  fieldsMappings,
  mention,
  children,
  onClick,
}) => {
  const { itemType } = mention;
  const actionRequired = itemType === InputItemTypes.COMBOBOX;
  const handleOnClick = () => {
    if (actionRequired) {
      onClick && onClick(mention);
    }
  };
  return (
    <span className={
      classNames(
          'pw-text-editor__mention',
          'pwapp-formula-editor-variable',
      )}
      onClick={handleOnClick}
    >
      { actionRequired && <Icons.Mapping className="pwapp-formula-editor__icon"/>}
      { children }
    </span >
  );
};

export default Variable;

import React, { FunctionComponent } from 'react';

import { FormMode, Icons, Item } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';
import FormulaEvaluator from './FormulaEvaluator';

interface Props extends Item {
  onChange: (value: any) => void;
  plainExpression: string;
  value: number;
}

const Formula: FunctionComponent<Props> = (item: Props) => {
  const { label, labelPlacement, mode, plainExpression, value = 0, onChange } = item;
  const handleEvaluate = (newValue: number) => {
    if (Number(value) !== Number(newValue)) {
      onChange(newValue);
    }
  };
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement}>
       {
           mode === FormMode.DESIGN && (
               <>
                   <Icons.Formula className="pwapp-formula-editor__icon"/>
                   <span className="pwapp-formula-evaluator__expression">{plainExpression}</span>
               </>
           )
       }
       {
           mode === FormMode.EDIT && <FormulaEvaluator onEvaluate={handleEvaluate} item={item}/>
       }
       {
           mode === FormMode.READONLY && <span>{value}</span>
       }
    </LabelAccessor>
  );
};

export default Formula;

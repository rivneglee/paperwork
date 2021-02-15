import React, { FunctionComponent } from 'react';
import { parse, eval as compile } from 'expression-eval';
import { Item } from '@paperwork/ui-widgets';

import './FormulaEvaluator.scss';
import { InputItemTypes } from '../../index';

interface Props {
  item: Item;
  onEvaluate: (value: number) => void;
}

const FormulaEvaluator: FunctionComponent<Props> = ({
  item,
  onEvaluate,
}) => {
  const { plainExpression, expression, values = {}, fieldsMappings = {} } = item;
  const { blocks = [], entityMap = {} } = expression;
  const [metadata] = blocks;
  try {
    if (metadata) {
      const { entityRanges = [], text = '' } = metadata;
      const compiled = entityRanges.reduce((results: string, current: any) => {
        const { key } = current;
        const variableEntity = entityMap[key].data;
        const { mention: variable } = variableEntity;
        const { id, name, itemType } = variable;
        let value = values[id];
        if (itemType === InputItemTypes.COMBOBOX) {
          value = fieldsMappings[id][value];
        }
        if (isNaN(value)) {
          throw Error('Invalid inputs');
        }
        return results.replace(name, value);
      }, text);
      // tslint:disable-next-line:no-eval
      const calculated = compile(parse(compiled), {});
      onEvaluate(calculated);
      return <span>{calculated}</span>;
    }
  } catch {}
  onEvaluate(0);
  return <span className="pwapp-formula-evaluator__expression">{plainExpression}</span>;
};

export default FormulaEvaluator;

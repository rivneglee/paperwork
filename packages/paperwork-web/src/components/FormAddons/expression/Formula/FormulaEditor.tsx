import React, { FunctionComponent, useState } from 'react';
import { Icons, Item, RichEditor, Tooltip } from '@paperwork/ui-widgets';
import Variable from './Variable';
import { InputItemTypes } from '../../index';
import MappingModal from './MappingModal';

import './FormulaEditor.scss';

interface Props {
  item: Item;
  onUpdate: (newItem: Item) => void;
}

const FormulaEditor: FunctionComponent<Props> = ({
  item,
  onUpdate,
}) => {
  const { items, fieldsMappings = {}, expression } = item;
  const [variable, setVariable] = useState<string | null>(null);
  const mentions = Object.values(items)
      .filter(({ fieldName }) => !!fieldName)
      .map(({ id, itemType, fieldName }) => ({
        id, itemType, name: fieldName,
      }));
  const handleVariableClick = (data: any) => {
    const { itemType, id } = data;
    if (itemType === InputItemTypes.COMBOBOX) {
      setVariable(id);
    }
  };
  const handleValuesMappingChange = (mappings: object) => {
    if (variable) {
      onUpdate({ ...item, fieldsMappings: { ...fieldsMappings, [variable]: mappings } });
      setVariable(null);
    }
  };
  const handleExpressionChange = (html: string, rawJson: any) => {
    const [firstBlock = { text: '' }] = rawJson.blocks;
    onUpdate({ ...item, expression: rawJson, plainExpression: firstBlock.text });
  };
  let warningMessage;
  if (expression) {
    const { entityMap = {} } = expression as any;
    const unmappedVariables = Object
        .values(entityMap)
        .map(({ data }) => (data.mention))
        .filter(({ itemType, id }) => (
          itemType === InputItemTypes.COMBOBOX
          && !fieldsMappings[id]
        ));
    if (unmappedVariables.length > 0) {
      warningMessage = (
            <Tooltip content={(
                <span>
                    Following fields require mappings:
                    {unmappedVariables.map(v => <div>{v.name}</div>)}
                </span>)}
            >
              <Icons.Warning className="pwapp-formula-editor__icon"/>
            </Tooltip>
        );
    }
  }

  return (
      <>
          <RichEditor
              label="Expression"
              labelPlacement="top"
              labelAccessory={warningMessage}
              mentions={mentions}
              showToolbar={false}
              content={expression}
              onChange={handleExpressionChange}
              mentionComponent={(props: any) =>  (
                 <Variable
                     {...props}
                     fieldsMappings={fieldsMappings}
                     onClick={handleVariableClick}
                 />
                )
              }
          />
          {
              variable && (
                  <MappingModal
                      item={items[variable]}
                      valuesMapping={fieldsMappings[variable]}
                      onSave={handleValuesMappingChange}
                      onCancel={() => setVariable(null)}
                  />
              )
          }
      </>
  );
};

export default FormulaEditor;

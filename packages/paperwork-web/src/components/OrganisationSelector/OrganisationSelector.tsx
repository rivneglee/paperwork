import React, { FunctionComponent } from 'react';
import { SelectableTreeNode, SelectableTree } from '@paperwork/ui-widgets';

interface Props {
  label?: string;
  organisation: any;
  onSelect?: (selections: string[]) => void;
  selections?: string[];
}

export type OrganisationSelectorComponent = FunctionComponent<Props>;

const buildTree = (organisation: any): SelectableTreeNode => {
  const { id, name, affiliates = [] } = organisation;
  return {
    value: id,
    label: name,
    children: affiliates.map((child: any) => buildTree(child)),
  };
};

const OrganisationSelector: OrganisationSelectorComponent  = ({
  organisation,
  onSelect,
  selections = [],
  label,
}) => {
  const handleOnCheck = (checkState: object) => {
    const selections = Object
      .keys(checkState)
      .filter(key => checkState[key] === 'checked');
    onSelect && onSelect(selections);
  };
  const treeNodes: SelectableTreeNode[] = [buildTree(organisation)];
  const checked = selections.reduce((acc: object, next: string) => ({
    ...acc,
    [next]: 'checked',
  }), {});
  return (
    <SelectableTree
      labelPlacement="top"
      label={label}
      treeNodes={treeNodes}
      showSearch
      checked={checked}
      onCheck={handleOnCheck}
    />
  );
};

export default OrganisationSelector;

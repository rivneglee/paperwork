import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
// @ts-ignore
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Icons from '../../graphic/Icons';
import { Input } from '../Input';

export type SelectableTreeComponent = FunctionComponent<Props>;

export interface SelectableTreeNode {
  value: string;
  label: string;
}

export interface SelectableTreeParent extends SelectableTreeNode{
  children: SelectableTreeNode[];
}

interface Props {
  treeNodes: SelectableTreeParent[] | SelectableTreeNode[];
  showSearch?: boolean;
  checkModel?: 'leaf' | 'all';
  noCascade?: boolean;
  onCheck?: (checked: string[]) => void;
  checked?: string[];
}

const SelectableTree: SelectableTreeComponent = ({
  treeNodes,
  showSearch = false,
  noCascade = false,
  checkModel = 'all',
  checked = [],
  onCheck,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const handleOnCheck = (checked: string[]) => {
    onCheck && onCheck(checked);
  };
  return (
    <div className={classNames('pw-selectable-tree')}>
      {
        showSearch && (
          <Input
            className="pw-selectable-tree-search"
            type="underlined"
            left={<Icons.Search />}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        )
      }
      <CheckboxTree
        icons={{
          check: <Icons.SelectedAll className="pw-selectable-tree-icon pw-selectable-tree--checked-all"/>,
          uncheck: <Icons.Unselected className="pw-selectable-tree-icon pw-selectable-tree--unchecked"/>,
          halfCheck: <Icons.Selected className="pw-selectable-tree-icon pw-selectable-tree--checked"/>,
          expandClose: <Icons.ArrowDown className="pw-selectable-tree-icon pw-selectable-tree--close"/>,
          expandOpen: <Icons.ArrowDown className="pw-selectable-tree-icon pw-selectable-tree--open"/>,
          expandAll: <></>,
          collapseAll: <></>,
          parentClose: <></>,
          parentOpen: <></>,
          leaf: <></>,
        }}
        optimisticToggle={true}
        noCascade={noCascade}
        checkModel={checkModel}
        nodes={treeNodes}
        checked={checked}
        expanded={expanded}
        onCheck={checked => handleOnCheck(checked)}
        onExpand={expanded => setExpanded(expanded)}
      />
    </div>
  );
};

export default SelectableTree;

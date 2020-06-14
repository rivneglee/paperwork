import React, { FunctionComponent, ReactElement } from 'react';

import { FormProps, AddEvent, MoveEvent, Item } from './types';
import Context from './Context';

interface ChildFunctionProps extends FormProps {
  onRemoveItem: (id: string) => void;
  onRemoveLayout: (id: string) => void;
  onItemPropsChange: (newItem: Item) => void;
  onNameChange: (name: string) => void;
}

type ChildFunction = (props: ChildFunctionProps) => ReactElement;

interface Props extends FormProps {
  children: ChildFunction;
  onChange?: (props: FormProps) => void;
}

const EventHandlerProvider: FunctionComponent<Props> = (props) => {
  const { children, onChange, ...otherProps } = props;
  const { layout, items } = otherProps;

  const onMove = (event: MoveEvent) => {
    const { sourceId, targetId, sourcePosition, targetPosition } = event;
    const newLayout = [...layout];
    const from = newLayout.find(({ id }) => id === sourceId);
    const to = newLayout.find(({ id }) => id === targetId);

    if (from && to) {
      const [removed] = from.childRefs.splice(sourcePosition, 1);
      to.childRefs.splice(targetPosition, 0, removed);
    }

    onChange && onChange({
      ...otherProps,
      layout: newLayout,
    });
  };

  const onAdd = (event: AddEvent) => {
    const { targetId, targetPosition, newLayoutNode, newItem } = event;
    const newLayout = [...layout, newLayoutNode].map((node) => {
      if (node.id === targetId) {
        const childRefs = [...node.childRefs];
        childRefs.splice(targetPosition, 0, newLayoutNode.id);
        return {
          ...node,
          childRefs,
        };
      }
      return node;
    });
    const newItems = newItem ? {
      ...items,
      [newItem.id]: newItem,
    } : items;

    onChange && onChange({
      ...otherProps,
      items: newItems,
      layout: newLayout,
    });
  };

  const onRemoveItem = (id: string) => {
    const newItems = { ...items };
    delete newItems[id];
    const newLayout = layout.filter((l) => {
      l.childRefs = l.childRefs.filter(child =>  child !== id);
      return l.id !== id;
    });

    onChange && onChange({
      ...otherProps,
      items: newItems,
      layout: newLayout,
    });
  };

  const onRemoveLayout = (id: string) => {
    const newLayout = layout.filter((l) => {
      l.childRefs = l.childRefs.filter(child =>  child !== id);
      return l.id !== id;
    });

    onChange && onChange({
      ...otherProps,
      layout: newLayout,
    });
  };

  const onItemPropsChange = (newItem: Item) => {
    const { id } = newItem;
    if (items[id]) {
      const newItems = { ...items, [id]: { ...items[id], ...newItem } };
      onChange && onChange({
        ...otherProps,
        items: newItems,
      });
    }
  };

  const onNameChange = (name: string) => {
    onChange && onChange({
      ...otherProps,
      name,
    });
  };

  return (
    <Context onAdd={onAdd} onMove={onMove}>
      {children({
        ...otherProps,
        onRemoveItem,
        onRemoveLayout,
        onItemPropsChange,
        onNameChange,
      })}
    </Context>
  );
};

export default EventHandlerProvider;

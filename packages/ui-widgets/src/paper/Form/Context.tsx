import React, { FunctionComponent } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import shortId from 'shortid';

import { AddEvent, DragAndDropType, LayoutLinkedNode, LayoutNodeTypes, MoveEvent } from './types';

interface Props {
  onAdd?: (event: AddEvent) => void;
  onMove?: (event: MoveEvent) => void;
}

const Context: FunctionComponent<Props> = ({ onAdd, onMove, children }) => {
  const handleDragEnd = (event: DropResult) => {
    const { source, destination, draggableId: type, type: dndType } = event;
    if (!destination) {
      return;
    }
    if (source.droppableId.startsWith('toolkit')) {
      if (onAdd) {
        const id = shortId.generate();
        const newLayoutNode: LayoutLinkedNode = {
          id,
          childRefs: [],
          type: dndType === DragAndDropType.ITEM ? LayoutNodeTypes.FORM_ITEM : type as LayoutNodeTypes,
        };
        const newItem = dndType === DragAndDropType.ITEM ? {
          id,
          itemType: type,
        } : undefined;
        onAdd({
          newItem,
          newLayoutNode,
          targetId: destination.droppableId,
          targetPosition: destination.index,
        });
      }
    } else {
      if (onMove) {
        onMove({
          sourceId: source.droppableId,
          sourcePosition: source.index,
          targetId: destination.droppableId,
          targetPosition: destination.index,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default Context;

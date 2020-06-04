import React, { FunctionComponent } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DropEvent } from './types';

interface Props {
  onDragEnd: (result: DropEvent) => void;
}

const Context: FunctionComponent<Props> = ({ onDragEnd, children }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default Context;

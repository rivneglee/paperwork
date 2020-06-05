import React, { FunctionComponent } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DragAndDropType } from './types';

interface Props {
  id: string;
  type: DragAndDropType;
  index?: number;
}

const ToolkitItem: FunctionComponent<Props> = ({ id, type, index = 0, children }) => (
  <div className="pw-form-toolkit-item">
    <Droppable droppableId={`toolkit-${type}`} isDropDisabled={true} type={type}>
      {provided => (
        <div ref={provided.innerRef}>
          <Draggable
            draggableId={id}
            index={index}>
            {(provided, snapshot) => (
              <React.Fragment>
                <div className="pw-form-toolkit-item__container"
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     style={
                       provided.draggableProps.style
                     }>
                  {children}
                </div>
                {snapshot.isDragging && (
                  <div
                    className="pw-form-toolkit-item__container pw-form-toolkit-item__container--dragging">
                    {children}
                  </div>
                )}
              </React.Fragment>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  </div>
);

export default ToolkitItem;

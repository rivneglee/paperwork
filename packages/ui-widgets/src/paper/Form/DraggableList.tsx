import React, { FunctionComponent, ReactElement } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { DragAndDropType, Layout, LayoutLinkedNode } from './types';

interface Props {
  id: string;
  layout: Layout;
  dragAndDropType?: DragAndDropType;
  disabled?: boolean;
  placeholder: ReactElement | string;
  renderItem: (layoutNode: LayoutLinkedNode) => ReactElement | null;
}

const DraggableList: FunctionComponent<Props> = ({
  id,
  layout,
  dragAndDropType,
  disabled,
  placeholder,
  renderItem,
}) => {
  const listNode = layout.find(_ => _.id === id);
  if (!listNode) return null;
  const childNodes = listNode.childRefs.map(childId => layout.find(_ => _.id === childId));
  const view = (
    <Droppable type={dragAndDropType} key={id} droppableId={id} isDropDisabled={disabled}>
      {
        (provided, snapshot) => (
          <div
            data-layout-id={id}
            className={
              classNames(
                'pw-draggable-list',
                snapshot.isDraggingOver && 'pw-draggable-list--dropping',
                disabled && 'pw-draggable-list--disabled',
              )
            }
            ref={provided.innerRef}
          >
            {childNodes.length ? childNodes.map(
              (layoutNode, index: number) => {
                if (!layoutNode) return null;
                return (
                  <Draggable key={layoutNode.id} draggableId={layoutNode.id} index={index} isDragDisabled={disabled}>
                    {(provided, { isDragging }) => {
                      const renderingItem = renderItem(layoutNode);
                      if (!renderingItem) return (
                        <div className="pw-draggable-list__row pw-draggable-list__row--hidden" ref={provided.innerRef}></div>
                      );
                      return (
                        <div
                          className={
                            classNames(
                              'pw-draggable-list__row',
                              `pw-draggable-list__row--${dragAndDropType}`,
                              isDragging && 'pw-draggable-list__row--dragging',
                            )
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          {renderingItem}
                        </div>
                      );
                    }}
                  </Draggable>
                );
              }) : !provided.placeholder && !disabled
              && <div className="pw-draggable-list__placeholder">{placeholder}</div>}
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  );

  return view;
};

export default DraggableList;

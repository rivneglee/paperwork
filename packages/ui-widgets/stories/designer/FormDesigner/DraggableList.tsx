import React from 'react';

import { DraggableList, LayoutNodeTypes, Card, DragAndDropType } from '../../../src';

export default () => {
  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Card>
        <DraggableList
          id="foo"
          renderItem={layoutNode => <span>{layoutNode.id}</span>}
          dragAndDropType={DragAndDropType.ITEM}
          placeholder="Drop item here..."
          layout={[
            { id: 'foo', childRefs: ['item1', 'item2', 'item3'], type:  LayoutNodeTypes.SIMPLE_LIST },
            { id: 'item1', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
            { id: 'item2', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
            { id: 'item3', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
          ]}
          onDragEnd={() => {}}
        />
      </Card>
    </div>
  );
};

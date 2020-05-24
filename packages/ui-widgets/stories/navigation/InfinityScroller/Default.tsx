import React, { useState } from 'react';

import { InfinityScroller, Icons, Scrollable, List } from '../../../src';

export default () => {
  const [items, setItems] = useState([1, 2, 3, 5]);

  const loadMore = () => {
    setTimeout(() => {
      setItems([...items, ...Array(5)]);
    }, 1000);
  };

  let scrollParent: any;
  return (
    <div style={{ height: 200 }}>
      <Scrollable setRef={ref => scrollParent = ref}>
        <InfinityScroller
          loadMore={loadMore}
          hasMore={true}
          getScrollParent={() => scrollParent}
        >
          <List>
            {
              items.map((_, i) =>  (
                <>
                  <List.Item onClick={close} icon={<Icons.Form/>}>
                    {i}
                  </List.Item>
                </>
              ))
            }
          </List>
        </InfinityScroller>
      </Scrollable>
    </div>
  );
};

import React, { useState } from 'react';

import { PaginationTemplate, List, Icons } from '../../../src';

let page = 0;

export default () => {
  const [items, setItems] = useState(Array.from({ length: 30 }, (_, i) => i));

  const loadMore = (nextPage: number) => {
    page = nextPage;
    setTimeout(() => {
      setItems([...items, ...Array(30)]);
    }, 1000);
  };

  return (
    <PaginationTemplate onLoadMore={loadMore} page={page} total={5}>
      <List>
        {
          items.map((_, i) =>  (
            <List.Item onClick={close} icon={<Icons.Form/>}>
              {i}
            </List.Item>
          ))
        }
      </List>
    </PaginationTemplate>
  );
};

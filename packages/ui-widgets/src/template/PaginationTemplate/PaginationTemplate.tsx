import React, { FunctionComponent, ReactElement, useState } from 'react';
import { BaseTemplate } from '../BaseTemplate';
import { InfinityScroller } from '../../navigation/InfinityScroller';

interface Props {
  header?: ReactElement;
  footer?: ReactElement;
  onLoadMore: (page: number) => void;
  page: number;
  total: number;
}

const PaginationTemplate: FunctionComponent<Props> = ({
  page,
  total,
  header,
  footer,
  children,
  onLoadMore,
}) => {
  const [scrollRef, setScrollRef] = useState(null);
  return  (
    <BaseTemplate header={header} footer={footer} setScrollerRef={ref => setScrollRef(ref)}>
      <InfinityScroller
        hasMore={page < total}
        loadMore={onLoadMore}
        getScrollParent={() => scrollRef}
      >
        {children}
      </InfinityScroller>
    </BaseTemplate>
  );
};

export default PaginationTemplate;

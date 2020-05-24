import React, { FunctionComponent, ReactElement, useState } from 'react';
import { BaseTemplate } from '../BaseTemplate';
import { InfinityScroller } from '../../navigation/InfinityScroller';

interface Props {
  header?: ReactElement;
  footer?: ReactElement;
  onLoadMore: (page: number) => void;
  spinner?: ReactElement;
  isProcessing?: boolean;
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
  spinner,
  isProcessing,
}) => {
  const [scrollRef, setScrollRef] = useState(null);
  return  (
    <BaseTemplate
      spinner={spinner}
      isProcessing={isProcessing}
      header={header}
      footer={footer}
      setScrollerRef={ref => setScrollRef(ref)}
    >
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

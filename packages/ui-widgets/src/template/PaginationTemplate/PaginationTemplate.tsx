import React, { FunctionComponent, ReactElement, useState } from 'react';
import { BaseTemplate } from '../BaseTemplate';
import { InfinityScroller } from '../../navigation/InfinityScroller';

interface Props {
  className?: string;
  header?: ReactElement;
  footer?: ReactElement;
  onLoadMore: (page: number) => void;
  spinner?: ReactElement;
  isProcessing?: boolean;
  page: number;
  total: number;
}

const PaginationTemplate: FunctionComponent<Props> = ({
  className,
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
  const [shouldShowSpinner, setShouldShowSpinner] = useState(true);
  const cooldown = 1000;

  const loadMore = () => {
    if (!isProcessing) {
      setShouldShowSpinner(false);
      onLoadMore(page);
      setTimeout(() => setShouldShowSpinner(true), cooldown + 100);
    }
  };

  return  (
    <BaseTemplate
      className={className}
      spinner={shouldShowSpinner ? spinner : undefined}
      isProcessing={isProcessing}
      header={header}
      footer={footer}
      setScrollerRef={ref => setScrollRef(ref)}
    >
      <InfinityScroller
        cooldown={cooldown}
        hasMore={page < total}
        loadMore={loadMore}
        getScrollParent={() => scrollRef}
      >
        {children}
      </InfinityScroller>
    </BaseTemplate>
  );
};

export default PaginationTemplate;

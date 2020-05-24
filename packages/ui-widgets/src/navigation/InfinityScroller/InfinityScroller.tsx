import React, { FunctionComponent, ReactElement } from 'react';
import { debounce } from 'debounce';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from '../../graphic/Spinner';

interface Props {
  loadMore: (page: number) => void;
  hasMore: boolean;
  spinner?: ReactElement;
  getScrollParent?: () => any;
  useWindow?: boolean;
  cooldown?: number;
}

const InfinityScroller: FunctionComponent<Props> = ({
 children,
 loadMore,
 hasMore = true,
 cooldown = 1000,
 spinner = (
   <Spinner type="ellipsis" size="s"/>
 ),
 getScrollParent = () => window,
}) => {
  const onLoadMore = debounce((page: number) => hasMore && loadMore(page), cooldown);
  return (
    <InfiniteScroll
      pageStart={0}
      threshold={50}
      initialLoad={false}
      loadMore={onLoadMore}
      hasMore={hasMore}
      loader={spinner}
      useWindow={false}
      getScrollParent={getScrollParent}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfinityScroller;

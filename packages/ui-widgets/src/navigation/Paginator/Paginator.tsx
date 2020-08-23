/* tslint:disable:no-increment-decrement */
import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { IconButton } from '../../form/IconButton';
import Icons from '../../graphic/Icons';

interface Props {
  total: number;
  current: number;
  onNavigate: (page: number) => void;
}

const Paginator: FunctionComponent<Props> = ({ current, total, onNavigate }) => {
  let from = 0;
  let to = total;
  const max = 6;
  if (total > max) {
    if ((current + max) <= total && (current - (max / 2) <= 0)) {
      from = 0;
      to = from + max;
    } else if ((current + max) <= total && (current - (max / 2) > 0)) {
      from = current - (max / 2);
      to = from + max;
    } else {
      to = total;
      from = total - max;
    }
  }

  const buttons = [];
  for (let i = from; i < to; i++) {
    const pageIdx = i + 1;
    const className = classNames('pw-paginator__link', pageIdx === current && 'pw-paginator__link--active');
    buttons.push(
      <IconButton className={className} onClick={() => onNavigate(pageIdx)}>
        {pageIdx}
      </IconButton>,
    );
  }

  const isFirstPage = current === 1;
  const isLastPage = current === total;

  return (
    <div className="pw-paginator">
      {!isFirstPage && (
        <IconButton
          className="pw-paginator__link"
          onClick={() => onNavigate(current - 1)}>
          <Icons.ArrowLeft/>
        </IconButton>
      )}
      {buttons}
      {!isLastPage && (
        <IconButton
          className="pw-paginator__link"
          onClick={() => onNavigate(current + 1)}>
          <Icons.ArrowRight/>
        </IconButton>
      )}
    </div>
  );
};

export default Paginator;

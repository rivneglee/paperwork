import React, { FunctionComponent, ReactElement, useState } from 'react';
import classNames from 'classnames';
import { Avater } from '../../graphic/Avater';
import Icons from '../../graphic/Icons';
import LaunchPadItem, { LaunchPadItemComponent } from './LaunchPadItem';

interface Props {
  itemPerRow?: number;
  placement: 'top' | 'bottom' | 'right' | 'left';
  renderTrigger?: (isExpanded: boolean) => ReactElement;
}

interface LaunchPadComponent extends FunctionComponent<Props> {
  Item: LaunchPadItemComponent;
}

const getStyle = (
  total:number,
  index: number,
  isExpanded: boolean,
  placement: string,
  itemPerRow: number,
): any => {
  const heightOfItem = 80;
  const widthOfItem = 80;
  const countOfRows = Math.trunc(total / itemPerRow) + (total % itemPerRow ? 1 : 0);
  const rowIndex = Math.trunc(index / itemPerRow) + 1;
  const colIndex = index - itemPerRow * (rowIndex - 1);
  const commonStyle = { position: 'absolute', transition: 'all .3s ease-in-out', transitionDelay: `0.0${rowIndex * 3}s` };
  const middleIndex = Math.trunc(itemPerRow / 2);
  let top = 0;
  let left = 0;
  let opacity = 0;
  if (isExpanded) {
    top = placement === 'bottom' ? -(heightOfItem * (countOfRows - rowIndex + 1)) : heightOfItem * rowIndex;
    left = (colIndex - middleIndex) * widthOfItem - (widthOfItem / 8);
    opacity = 1;
  }
  return { ...commonStyle, top, left, opacity };
};

const LaunchPad: LaunchPadComponent = ({
  placement = 'bottom',
  itemPerRow = 5,
  children,
  renderTrigger,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultTrigger = (
    <Avater
      size="large"
      shadow
      className={classNames(
        'pw-launchpad__trigger',
        {
          ['pw-launchpad__trigger--expanded']: isExpanded,
        },
      )}>
      <Icons.Add/>
    </Avater>
  );
  const trigger = renderTrigger ? renderTrigger(isExpanded) : defaultTrigger;
  return (
    <div className="pw-launchpad">
      {
        React.Children.map(children, (child, i) => (
          <span
            style={getStyle(React.Children.count(children), i, isExpanded, placement, itemPerRow)}>
            {child}
          </span>
        ))
      }
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {trigger}
      </div>
    </div>
  );
};

LaunchPad.Item = LaunchPadItem;

export default LaunchPad;

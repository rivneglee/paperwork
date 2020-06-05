import React, { FunctionComponent, ReactElement, useState } from 'react';
import classNames from 'classnames';
import { Avater } from '../../graphic/Avater';
import Icons from '../../graphic/Icons';
import LaunchPadItem, { LaunchPadItemComponent } from './LaunchPadItem';

interface Props {
  itemPerRow?: number;
  placement?: 'top' | 'bottom' | 'right' | 'left';
  renderTrigger?: (isExpanded: boolean) => ReactElement;
  useOverlay?: boolean;
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
    top = placement === 'bottom' ?  heightOfItem * rowIndex : -(heightOfItem * (countOfRows - rowIndex + 1));
    left = (colIndex - middleIndex) * widthOfItem - (widthOfItem / 8);
    if (placement === 'right') {
      top = countOfRows > 1 ? top + (middleIndex + 1) * heightOfItem : 0;
      left = left + (Math.trunc(itemPerRow / 2) + 1) * widthOfItem;
    }
    opacity = 1;
  }
  return { ...commonStyle, top, left, opacity };
};

const LaunchPad: LaunchPadComponent = ({
  placement = 'top',
  itemPerRow = 5,
  children,
  renderTrigger,
  useOverlay,
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
        useOverlay && (
          <div
            className={classNames('pw-launchpad-overlay', isExpanded && 'pw-launchpad-overlay--show')}
            onClick={() => setIsExpanded(false)}
          >
          </div>
        )
      }
      <div className="pw-launchpad__trigger-wrapper" onClick={() => setIsExpanded(!isExpanded)}>
        {trigger}
      </div>
      {
        React.Children.map(children, (child, i) => (
          <span
            className="pw-launchpad-item-container"
            style={getStyle(React.Children.count(children), i, isExpanded, placement, itemPerRow)}>
            {child}
          </span>
        ))
      }
    </div>
  );
};

LaunchPad.Item = LaunchPadItem;

export default LaunchPad;

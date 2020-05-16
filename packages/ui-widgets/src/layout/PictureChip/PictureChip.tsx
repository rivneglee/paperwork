import React, { FunctionComponent, ReactElement, useState } from 'react';
import classNames from 'classnames';
import { Icons } from '../../index';

interface Props {
  className?: string;
  size?: string;
  title: string | ReactElement;
  subTitle: string | ReactElement;
  imageUrl: string;
  content: string | ReactElement;
  footer: string | ReactElement;
  color?: 'red' | 'pink' | 'purple' | 'indigo'
    | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green'
    | 'light-green' | 'lime' | 'yellow' | 'amber'
    | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';
}

const PictureChip: FunctionComponent<Props> = ({
  className,
  size,
  color,
  title,
  subTitle,
  imageUrl,
  content,
  footer,
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={
      classNames(
        'pw-picture-chip',
        className,
        size && `pw-picture-chip--size-${size}`,
        color && `pw-picture-chip--color-${color}`,
      )}
    >
      <article className={classNames('pw-picture-chip__container', isActive && 'pw-picture-chip--active')}>
        <h2>
          <span>{title}</span>
          <strong>
            {subTitle}
          </strong>
        </h2>
        <div className="pw-picture-chip__body">
          <div className="pw-picture-chip__img-container">
            <img className="pw-picture-chip__hero-image" src={imageUrl}/>
          </div>
          <div className="pw-picture-chip__content">
            {content}
          </div>
        </div>
        <a className="pw-picture-chip__action-button" onClick={() => setIsActive(!isActive)}>
          {
            isActive ? <Icons.ArrowLeft/> : <Icons.Menu />
          }
        </a>
        <div className="pw-picture-chip__footer">
          {footer}
        </div>
      </article>
    </div>
  );
};

export default PictureChip;

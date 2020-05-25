import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  image?: string;
  title: string | ReactElement;
  description: string | ReactElement;
  buttons?: ReactElement[];
}

const PageState: FunctionComponent<Props> = ({
  image,
  title,
  description,
  buttons,
}) => (
  <div className="pw-page-state">
    {image && (
      <div className="pw-page-state__image">
        <img src={image} />
      </div>
    )}
    <div className="pw-page-state__context">
      <div className="pw-page-state__title">
        <h3>{title}</h3>
      </div>
      <div className="pw-page-state__description">
        {description}
      </div>
    </div>
    <div className="pw-page-state__action">
      {buttons}
    </div>
  </div>
);

export default PageState;

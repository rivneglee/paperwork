import React, { FunctionComponent } from 'react';

import { Item, FormMode, RichEditor } from '@paperwork/ui-widgets';
import './RichText.scss';

interface Props extends Item {
  onChange: (value: any) => void;
}

const RichText: FunctionComponent<Props> = ({ onChange, value, id, mode }) => {
  return (
    <RichEditor
      className="pwapp-form-text"
      key={id}
      contentHtml={value}
      disabled={mode !== FormMode.DESIGN}
      placeholder="Enter text here..."
      onChange={value => onChange(value)}
    />
  );
};

export default RichText;

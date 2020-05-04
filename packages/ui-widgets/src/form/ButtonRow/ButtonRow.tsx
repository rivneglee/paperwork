import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  primary?: ReactElement[];
  secondary?: ReactElement[];
}

export type ButtonComponent = FunctionComponent<Props>;

const ButtonRow: ButtonComponent = ({ primary = [], secondary = []}) => (
  <div className="pw-button-row">
    <div className="pw-button-row__primary">
      {primary}
    </div>
    <div className="pw-button-row__secondary">
      {secondary}
    </div>
  </div>
);

export default ButtonRow;

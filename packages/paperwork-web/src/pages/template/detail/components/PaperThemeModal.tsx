import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import {
  IconButton,
  Modal,
  ButtonRow,
  Button,
  Icons,
} from '@paperwork/ui-widgets';

import './PaperThemeModal.scss';

interface Props {
  onClose: () => void;
  onChoseColor: (themeColor: string) => void;
}

const themeColors = [
  'pink', 'red', 'purple', 'indigo', 'blue', 'cyan',
  'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange', 'brown',
];

const PaperThemeModal: FunctionComponent<Props> = ({ onClose, onChoseColor }) => (
  <Modal
    isOpen={true}
    header={
      <Modal.Header
        title="Form appearance"
        subTitle="Choose theme color for your form"
      />
    }
    footer={
      <Modal.Footer>
        <ButtonRow primary={[
          <Button key="confirm" color="secondary" size="s" onClick={onClose}>OK</Button>,
        ]}/>
      </Modal.Footer>
    }
  >
    <div className="pwapp-appearance">
      {
        themeColors.map(color => (
          <IconButton
            onClick={() => onChoseColor(color)}
            className={classNames('pwapp-theme-button', color && `pwapp-theme-button--${color}`)}
          />
        ))
      }
      <IconButton
        onClick={() => onChoseColor('')}
        className={classNames('pwapp-theme-button', 'pwapp-theme-button--none')}
      >
        <Icons.None/>
      </IconButton>
    </div>
  </Modal>
);

export default PaperThemeModal;

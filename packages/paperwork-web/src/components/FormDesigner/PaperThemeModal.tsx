import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import header1 from './images/default-header.jpeg';
import header2 from './images/header2.jpeg';
import header3 from './images/header3.jpeg';
import header4 from './images/header4.jpeg';
import header5 from './images/header5.jpeg';

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
  onChangeImage: (img: string) => void;
}

const themeColors = [
  'pink', 'red', 'purple', 'indigo', 'blue', 'cyan',
  'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange', 'brown',
];

const headerImages = [
  header1, header2, header3, header4, header5,
];

const PaperThemeModal: FunctionComponent<Props> = ({ onClose, onChoseColor, onChangeImage }) => {
  const handleClick = (index: number) => {
    onChangeImage(headerImages[index]);
  };
  return (
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
        <h4>Colours</h4>
        <div className="pwapp-theme">
          {
            themeColors.map(color => (
              <IconButton
                onClick={() => onChoseColor(color)}
                className={classNames('pwapp-theme__button', color && `pwapp-theme__button--${color}`)}
              />
            ))
          }
          <IconButton
            onClick={() => onChoseColor('')}
            className={classNames('pwapp-theme__button', 'pwapp-theme__button--none')}
          >
            <Icons.None/>
          </IconButton>
        </div>
        <h4>Header images</h4>
        <Carousel showArrows={true} onClickItem={handleClick} onClickThumb={handleClick}>
          {
            headerImages.map(img => (
              <div key={img}>
                <img src={img}/>
              </div>
            ))
          }
        </Carousel>
      </div>
    </Modal>
  );
};

export default PaperThemeModal;

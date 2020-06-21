import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  IconButton,
  Modal,
  ButtonRow,
  Button,
  Icons,
} from '@paperwork/ui-widgets';

import HeaderImagesProvider from '../FormHeaderImageProvider/HeaderImagesProvider';
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

const PaperThemeModal: FunctionComponent<Props> = ({ onClose, onChoseColor, onChangeImage }) => {
  const handleClick = (index: number) => {
    onChangeImage(`header${index}`);
  };
  return (
    <HeaderImagesProvider>
      {
        ({ images }) => (
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
                  images.map(img => (
                    <div key={img}>
                      <img src={img}/>
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </Modal>
        )
      }
    </HeaderImagesProvider>
  );
};

export default PaperThemeModal;

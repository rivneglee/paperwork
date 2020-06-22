import React, { FunctionComponent, ReactElement } from 'react';

const header1 = require('./images/header1.jpeg');
const header2 = require('./images/header2.jpeg');
const header3 = require('./images/header3.jpeg');
const header4 = require('./images/header4.jpeg');
const header5 = require('./images/header5.jpeg');

const headerImages = [
  header1, header2, header3, header4, header5,
];

const imageKeyMap = {
  header1,
  header2,
  header3,
  header4,
  header5,
};

export interface HeaderImagesState {
  images: string[];
  getImageByKey: (key?: string) => string;
}

interface Props {
  children: (state: HeaderImagesState) => ReactElement | null;
}

const HeaderImagesProvider: FunctionComponent<Props> = ({
  children,
}) => (
  <>
    {
      children({
        images: headerImages,
        getImageByKey: (key: string = 'header1') => imageKeyMap[key],
      })
    }
  </>
);

export default HeaderImagesProvider;

import React, { FunctionComponent, ReactElement } from 'react';

import header1 from './images/header1.jpeg';
import header2 from './images/header2.jpeg';
import header3 from './images/header3.jpeg';
import header4 from './images/header4.jpeg';
import header5 from './images/header5.jpeg';

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

// @ts-nocheck
import fs from 'fs';

const getBase64 = (key: string) => (
  fs.readFileSync(`${__dirname}/../../src/components/FormHeaderImageProvider/images/${key}.jpeg`)
);

const images = {
  header1: getBase64('header1'),
  header2: getBase64('header2'),
  header3: getBase64('header3'),
  header4: getBase64('header4'),
  header5: getBase64('header5'),
};

const getHeaderImgBase64 = (key: string = 'header1') => {
  const base64Image = new Buffer.from(images[key]).toString('base64');
  return `data:image/jpeg;base64,${base64Image}`;
};

export default getHeaderImgBase64;

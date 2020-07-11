// @ts-nocheck
import React from 'react';
import fs from 'fs';
import nodeHtmlToImage from 'node-html-to-image';
import getHeaderImgBase64 from './getHeaderImgBase64';
import { renderToString } from 'react-dom/server';
import { getButtonMap, getInputMap, getLayoutMap } from '../components/FormAddons';
import FormEditor from '../components/FormEditor/FormEditor';

const buildPath = require('../../build/asset-manifest.json');

const mainCss = (fs.readFileSync(`${__dirname}/../../build/${buildPath['main.css']}`)).toString();

export default (data, encoding) => {
  const headerImage = getHeaderImgBase64(data.headerImage);
  const template = {
    ...data,
    headerImage: '{{headerImage}}',
  };
  const thumbnail = renderToString(
    (<FormEditor
      {...template}
      itemMetadataMap={{
        ...getInputMap(),
        ...getButtonMap(),
      }}
      layoutComponentMap={getLayoutMap()}
    />),
  );
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>${mainCss}</style>
        <style>
          body {
            width: 600px;
          }
          .pw-form {padding: 0;}
          .pw-form__header-img{
            border-radius: 0;
          }
        </style>
      </head>
      <body>
        <div id="root">${thumbnail}</div>
      </body>
    </html>`;

  return nodeHtmlToImage({
    html,
    encoding,
    type: 'jpeg',
    quality: 60,
    content: { headerImage },
  });
};

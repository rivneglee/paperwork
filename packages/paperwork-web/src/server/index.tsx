import 'css-modules-require-hook/preset';
import './setupGlobalVariables';
import React from 'react';
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
// @ts-ignore
import nodeHtmlToImage from 'node-html-to-image';

import FormEditor from '../components/FormEditor/FormEditor';
import { getButtonMap, getInputMap, getLayoutMap } from '../components/FormAddons';
import getHeaderImgBase64 from './getHeaderImgBase64';

const buildPath = require('../../build/asset-manifest.json');
const mainCss = (fs.readFileSync(`${__dirname}/../../build/${buildPath['main.css']}`)).toString();

const app = express();
app.use(bodyParser.json());

app.post('/api/form/thumbnail', async (request, response) => {
  try {
    const { body } = request;
    const headerImage = getHeaderImgBase64(body.headerImage);
    const template = {
      ...body,
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
            width: 100%;
            height: 200px;
            border-radius: 0;
          }
        </style>
      </head>
      <body>
        <div id="root">${thumbnail}</div>
      </body>
    </html>`;
    const image = await nodeHtmlToImage({
      html,
      content: { headerImage },
    });
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(image, 'binary');
  } catch (e) {
    console.log(e.message);
    response.status(500);
    response.end();
  }
});

app.listen('9000', () => console.log('SSR Server started'));

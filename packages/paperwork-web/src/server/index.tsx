import 'css-modules-require-hook/preset';
import './setupGlobalVariables';
import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
// import buildPath from '../build/asset-manifest.json';
import { renderToString } from 'react-dom/server';
import FormEditor from '../components/FormEditor/FormEditor';
import { getButtonMap, getInputMap, getLayoutMap } from '../components/FormAddons';

const app = express();
app.use(bodyParser.json());

app.post('/thumbnail', (request, response) => {
  const { body } = request;
  const thumbnail = renderToString(
    (<FormEditor
      {...body}
      itemMetadataMap={{
        ...getInputMap(),
        ...getButtonMap(),
      }}
      layoutComponentMap={getLayoutMap()}
    />),
  );
  return response.send(thumbnail);
});

app.listen('9000', () => console.log('SSR Server started'));

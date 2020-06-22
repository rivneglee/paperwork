import 'css-modules-require-hook/preset';
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'svg'],
});
import './setupGlobalVariables';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { findTemplate } from '../service/template';
import generateThumbnail from './generateThumbnail';
import { createStore } from '../store';
import { Provider } from 'react-redux';
import { Route, StaticRouter, Switch } from 'react-router';
import SignInPage from '../pages/signIn';
import { withAuthValidation } from '../service/authentication';
import DataSourceListPage from '../pages/dataSource/list';
import DataSourceDetailPage from '../pages/dataSource/detail';
import TemplateListPage from '../pages/template/list';
import TemplateDetailPage from '../pages/template/detail';
import { PageNotFound } from '../pages/error';

const buildPath = require('../../build/asset-manifest.json');

const app = express();
app.use(bodyParser.json());

const store: any = createStore();

app.use((request, response, next) => {
  if (request.url.startsWith('/static/')
    || request.url.startsWith('/api')
    || request.url.endsWith('favicon.ico')
    || request.url.endsWith('manifest.json')
  ) {
    return next();
  }

  const appString = renderToString((
    <div className="pwapp-root">
      <Provider store={store}>
        <StaticRouter
          location={request.url}
          context={{}}>
          <Switch>
            <Route exact component={SignInPage} path="/signin/"/>
            <Route exact component={withAuthValidation(DataSourceListPage)} path="/datasource/"/>
            <Route exact component={withAuthValidation(DataSourceDetailPage)} path="/datasource/:dataSourceId"/>
            <Route exact component={withAuthValidation(TemplateListPage)} path="/templates"/>
            <Route exact component={withAuthValidation(TemplateDetailPage)} path="/templates/:templateId"/>
            <Route component={PageNotFound}/>
          </Switch>
        </StaticRouter>
      </Provider>
    </div>
  ));
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Paperwork</title>
        <link rel="manifest" href="../../manifest.json">
        <link rel="shortcut icon" href="../../favicon.ico">
        <link rel="stylesheet" href="/${buildPath['main.css']}">
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
        <script src="/${buildPath['main.js']}"></script>
      </body>
    </html>`;
  response.send(html);
});

app.post('/api/:userId/templates/:templateId/thumbnail', async (request, response) => {
  try {
    const { body } = request;
    const image = await generateThumbnail(body);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(image, 'binary');
  } catch (e) {
    console.log(e.message);
    response.status(500);
    response.end();
  }
});

app.get('/api/:userId/templates/:templateId/thumbnail', async (request, response) => {
  try {
    const { userId, templateId } = request.params;
    const data = await findTemplate(userId, templateId);
    const image = await generateThumbnail(data);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(image, 'binary');
  } catch (e) {
    console.log(e.message);
    response.status(500);
    response.end();
  }
});

app.use('/', express.static(path.resolve('build')));

app.listen('9000', () => console.log('SSR Server started'));

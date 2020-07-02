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
import { Route, Switch, StaticRouter } from 'react-router';
import SignInPage from '../pages/signIn';
import DataSourceListPage from '../pages/dataSource/list';
import DataSourceDetailPage from '../pages/dataSource/detail';
import TemplateListPage from '../pages/template/list';
import TemplateDetailPage from '../pages/template/detail';
import { PageNotFound } from '../pages/error';
import getHtmlMarkup from './getHtmlMarkup';

const env = process.env.NODE_ENV;

const app = express();
app.use(bodyParser.json());
const store: any = createStore();

if (env === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../../config/webpack.config.dev');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));
}

// Not in use
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
            <Route exact component={DataSourceListPage} path="/datasource/"/>
            <Route exact component={DataSourceDetailPage} path="/datasource/:dataSourceId"/>
            <Route exact component={TemplateListPage} path="/templates"/>
            <Route exact component={TemplateDetailPage} path="/templates/:templateId"/>
            <Route component={PageNotFound}/>
          </Switch>
        </StaticRouter>
      </Provider>
    </div>
  ));
  response.send(getHtmlMarkup(appString, env));
});

app.post('/api/thumbnail', async (request, response) => {
  try {
    const { body } = request;
    const image = await generateThumbnail(body, 'base64');
    response.json({
      dataUri: `data:image/jpeg;base64,${image}`,
    });
  } catch (e) {
    console.log(e.message);
    response.status(500);
    response.end();
  }
});

app.get('/api/:userId/templates/:templateId/thumbnail', async (request, response) => {
  try {
    const { query, params } = request;
    const { userId, templateId } = params;
    const { encoding = 'binary' } = query;
    const data = await findTemplate(userId, templateId);
    const image = await generateThumbnail(data, encoding);
    if (encoding === 'base64') {
      response.end(`data:image/jpeg;base64,${image}`);
    } else {
      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.end(image, 'binary');
    }
  } catch (e) {
    console.log(e.message);
    response.status(500);
    response.end();
  }
});

app.use('/', express.static(path.resolve('build')));

app.listen('9000', () => console.log('SSR Server started'));

export default (appString: string, env: string = 'development') => {
  let css = '';
  let js = '';
  if (env === 'production') {
    const buildPath = require('../../build/asset-manifest.json');
    css = `<link rel="stylesheet" href="/${buildPath['main.css']}">`;
    js = `<script src="/${buildPath['main.js']}"></script>`;
  }
  return `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Paperwork</title>
        <link rel="manifest" href="../../manifest.json">
        <link rel="shortcut icon" href="../../favicon.ico">
        ${css}
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
        ${js}
      </body>
    </html>`;
};

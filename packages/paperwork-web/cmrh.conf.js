module.exports = {
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    require('node-sass').renderSync({
      data,
      file: filename
    }).css,
  camelCase: true,
  generateScopedName: '[name]__[local]___[hash:base64:5]',
}

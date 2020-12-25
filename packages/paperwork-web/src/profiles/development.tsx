export default {
  integrationType: process.env.REACT_APP_INTEGRATION_TYPE || 'Http',
  gatewayUrl: 'http://localhost:5000',
  prettyUI: process.env.REACT_APP_UI_MODE === 'pretty',
};

export default {
  integrationType: process.env.REACT_APP_INTEGRATION_TYPE || 'Memory',
  gatewayUrl: 'http://paper-service.thethirdqc.com:5000',
  prettyUI: process.env.REACT_APP_UI_MODE === 'pretty',
};

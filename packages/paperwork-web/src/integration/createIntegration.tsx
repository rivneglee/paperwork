import { Integration, IntegrationProfile } from './types';

export default (mappings: any): Integration => {
  const profile: IntegrationProfile = require(`../profiles/${process.env.REACT_APP_PROFILE}`).default;
  const factoryFunction = require(`./create${profile.integrationType}Integration`).default;
  const mapping = mappings[profile.integrationType];
  return factoryFunction(mapping, profile);
};

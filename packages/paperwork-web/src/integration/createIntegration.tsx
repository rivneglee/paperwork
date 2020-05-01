import { Integration, IntegrationProfile } from './types';

const profileKey = process.env.REACT_APP_PROFILE;

export default (mappings: any): Integration => {
  const profile: IntegrationProfile = require(`../profiles/${profileKey}`).default;
  const factoryFunction = require(`./create${profile.integrationType}Integration`).default;
  const mapping = mappings[profile.integrationType];
  return factoryFunction(mapping, profile);
};

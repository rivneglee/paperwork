import { Integration, IntegrationProfile } from './types';

const profileKey = process.env.NODE_ENV;

export default (mappings: any): Integration => {
  const profile: IntegrationProfile = require(`../profiles/${profileKey}`).default;
  const factoryFunction = require(`./create${profile.integrationType}Integration`).default;
  const mapping = mappings[profile.integrationType];
  return factoryFunction(mapping, profile);
};

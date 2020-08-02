import { Integration, IntegrationProfile } from './types';
import getProfile from '../getProfile';

export default (mappings: any): Integration => {
  const profile: IntegrationProfile = getProfile();
  const factoryFunction = require(`./create${profile.integrationType}Integration`).default;
  const mapping = mappings[profile.integrationType];
  return factoryFunction(mapping, profile);
};

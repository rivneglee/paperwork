import Authenticator from './AuthenticationProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const AuthenticationProvider = withIntegration(Authenticator, mappings);
export * from './AuthenticationProvider';
export { default as withAuthValidation } from './withAuthValidation';

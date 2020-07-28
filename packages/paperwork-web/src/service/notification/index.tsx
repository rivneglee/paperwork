import NotificationProvider from './Provider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const Provider = withIntegration(NotificationProvider, mappings);
export * from './Provider';

import List from './ListProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const ListProvider = withIntegration(List, mappings);
export * from './ListProvider';

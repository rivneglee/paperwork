import Detail from './DetailProvider';
import List from './ListProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const ListProvider = withIntegration(List, mappings);
export const DetailProvider = withIntegration(Detail, mappings);
export * from './DetailProvider';
export * from './ListProvider';

import List from './ListProvider';
import Detail from './DetailProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const ListProvider = withIntegration(List, mappings);
export const DetailProvider = withIntegration(Detail, mappings);
export * from './ListProvider';

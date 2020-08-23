import CommitsProvider from './AggregatedCommitsProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const AggregatedCommitsProvider = withIntegration(CommitsProvider, mappings);
export * from './AggregatedCommitsProvider';

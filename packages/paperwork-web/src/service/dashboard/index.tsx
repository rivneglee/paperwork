import RProvider from './ReminderProvider';
import TProvider from './TrendProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';

export const ReminderProvider = withIntegration(RProvider, mappings);
export const TrendProvider = withIntegration(TProvider, mappings);
export * from './ReminderProvider';
export * from './TrendProvider';

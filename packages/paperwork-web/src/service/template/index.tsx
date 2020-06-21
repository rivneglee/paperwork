import List from './ListProvider';
import Detail from './DetailProvider';
import { withIntegration } from '../../integration';
import * as mappings from './mappings';
import createIntegration from '../../integration/createIntegration';
import { LOAD_TEMPLATE_DETAIL } from './intents';

export const ListProvider = withIntegration(List, mappings);
export const DetailProvider = withIntegration(Detail, mappings);
export * from './ListProvider';
export * from './DetailProvider';

export const findTemplate = (userId: string, templateId: string) => {
  const integration = createIntegration(mappings);
  return integration.send({
    intent: LOAD_TEMPLATE_DETAIL,
    method: 'GET',
    urlParams: {
      userId,
      templateId,
    },
  });
};

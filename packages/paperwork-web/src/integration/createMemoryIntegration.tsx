import { Request, Integration, RequestFunctionMapping } from './types';

const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const invoke = async (mapping: RequestFunctionMapping, request: Request) => {
  const { intent, urlParams, params, content, method } = request;
  const integrationFunction = mapping[intent];
  if (!integrationFunction) throw new Error(`Unknown intent ${intent} is used.`);
  const response = await integrationFunction({
    urlParams,
    params,
    content,
  });
  console.log(`${intent}:`, {
    response,
    request: { method, urlParams, params, content },
  });
  await sleep(1000);
  return response;
};

const createMemoryIntegration = (mapping: RequestFunctionMapping): Integration => ({
  send: async (request: Request) => invoke(mapping, request),
});

export default createMemoryIntegration;

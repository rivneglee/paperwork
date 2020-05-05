import { Request, Integration, RequestFunctionMapping } from './types';

const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const invoke = async (mapping: RequestFunctionMapping, request: Request) => {
  const { intent, urlParams, params, content, method } = request;
  const integrationFunction = mapping[intent];
  if (!integrationFunction) throw new Error(`Unknown intent ${intent} is used.`);
  console.log('Request:', method, urlParams, content, params);
  const response = await integrationFunction({
    urlParams,
    params,
    content,
  });
  console.log('Response:', response);
  await sleep(3000);
  return response;
};

const createMemoryIntegration = (mapping: RequestFunctionMapping): Integration => ({
  send: async (request: Request) => invoke(mapping, request),
});

export default createMemoryIntegration;

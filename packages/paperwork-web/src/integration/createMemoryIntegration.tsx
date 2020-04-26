import { ReadRequest, Integration, RequestFunctionMapping, WriteRequest } from './types';

const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const invoke = async (mapping: RequestFunctionMapping, request: ReadRequest | WriteRequest) => {
  const { intent, urlParams = {} } = request;
  const integrationFunction = mapping[intent];
  if (!integrationFunction) throw new Error(`Unknown intent ${intent} is used.`);
  const response = await integrationFunction({ ...urlParams });
  await sleep(3000);
  return response;
};

const createMemoryIntegration = (mapping: RequestFunctionMapping): Integration => ({
  read: async (request: ReadRequest) => invoke(mapping, request),

  write: async (request: WriteRequest) => invoke(mapping, request),
});

export default createMemoryIntegration;

import { Request, Integration, RequestFunctionMapping } from './types';
import getProfile from '../getProfile';
import IntegrationHttpError from './IntegrationHttpError';

const getQueryParams = (params: object = {}) => Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const createHttpIntegration = (mapping: RequestFunctionMapping): Integration => ({
  send: async (request: Request, options: any = {}) => {
    const profile = getProfile();
    const { intent, method, content, params = {} } = request;
    const getPath = mapping[intent] as any;
    const url = `${profile.gatewayUrl}${getPath(request)}?${getQueryParams(params)}`;
    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content ? JSON.stringify(content) : undefined,
    });
    if (response.status < 300) {
      return await response.json();
    }
    throw new IntegrationHttpError(response);
  },
});

export default createHttpIntegration;

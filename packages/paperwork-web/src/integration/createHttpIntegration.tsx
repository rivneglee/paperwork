import { Integration, Request, RequestFunctionMapping, ResponseType } from './types';
import getProfile from '../getProfile';
import IntegrationHttpError from './IntegrationHttpError';
import AuthenticationStorage from '../service/authentication/AuthenticationStorage';

const getQueryParams = (params: object = {}) => Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const createHttpIntegration = (mapping: RequestFunctionMapping): Integration => ({
  send: async (request: Request, options: any = {}) => {
    const profile = getProfile();
    const { intent, method, content, params = {} } = request;
    const getPath = mapping[intent] as any;
    const url = `${profile.gatewayUrl}${getPath(request)}?${getQueryParams(params)}`;
    const { accessToken = '' } = AuthenticationStorage.get() || {};
    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: content ? JSON.stringify(content) : undefined,
    });
    if (response.status < 300) {
      const { responseType = ResponseType.JSON } = options;
      if (responseType === ResponseType.BLOB) {
        return await response.blob();
      }
      return await response.json();
    }
    if (response.status === 401) {
      AuthenticationStorage.clear();
    }
    throw new IntegrationHttpError(response);
  },
});

export default createHttpIntegration;

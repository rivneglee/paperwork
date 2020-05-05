export interface IntegrationProfile {
  integrationType: 'Memory' | 'Http';
  gatewayUrl: string;
}

export interface Request {
  intent: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  params?: object;
  urlParams?: object;
  content?: any;
}

export interface RequestFunctionOptions {
  urlParams?: object;
  params?: object;
  content?: any;
}

export type RequestFunction = (options: RequestFunctionOptions) => Promise<any>;

export type RequestFunctionMapping = {[key: string]: RequestFunction};

export interface Integration {
  send: (request: Request) => Promise<any>;
}

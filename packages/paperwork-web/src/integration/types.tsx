interface Request {
  intent: string;
  params?: object;
  urlParams?: object;
}

export interface IntegrationProfile {
  integrationType: 'Memory' | 'Http';
  gatewayUrl: string;
}

export interface ReadRequest extends Request {
  method: 'GET';
}

export interface WriteRequest extends Request {
  method: 'POST' | 'DELETE' | 'PUT';
  content?: any;
}

export type RequestFunction = (params: { [key: string]: string|number }) => Promise<any>;

export type RequestFunctionMapping = {[key: string]: RequestFunction};

export interface Integration {
  read: (request: ReadRequest) => Promise<any>;
  write: (request: WriteRequest) => Promise<any>;
}

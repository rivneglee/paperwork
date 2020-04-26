import createMemoryIntegration from '../createMemoryIntegration';
import { RequestFunctionMapping } from '../types';

describe('createMemoryIntegration', () => {
  const read = jest.fn(() => Promise.resolve('read response'));
  const write = jest.fn(() => Promise.resolve('write response'));
  const mapping: RequestFunctionMapping = {
    READ_SOMETHING: read,
    WRITE_SOMETHING: write,
  };

  const integration = createMemoryIntegration(mapping);
  const urlParams = {
    name: 'foo',
  };

  describe('read', () => {
    let response: Promise<string>;

    beforeAll(() => {
      response = integration.read({
        urlParams,
        intent: 'READ_SOMETHING',
        method: 'GET',
      });
    });

    it('should return correct response', (done) => {
      response.then((payload: string) => {
        expect(payload).toBe('read response');
        done();
      });
    });

    it('should call request handler with correct params', () => {
      expect(read).toBeCalledWith(urlParams);
    });
  });

  describe('write', () => {
    let response: Promise<string>;

    beforeAll(() => {
      response = integration.write({
        urlParams,
        intent: 'WRITE_SOMETHING',
        method: 'POST',
      });
    });

    it('should return correct response', (done) => {
      response.then((payload: string) => {
        expect(payload).toBe('write response');
        done();
      });
    });

    it('should call request handler with correct params', () => {
      expect(write).toBeCalledWith(urlParams);
    });
  });
});

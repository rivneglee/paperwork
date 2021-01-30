import { getWriteRequestPayload } from '../selectors';

describe('form service selector', () => {
  const input: any = {
    author: { id: '', displayName: '', username: '' },
    createdAt: '',
    heroImage: '',
    id: '123',
    items: { foo: {
      enableDataBinding: true,
      id: 'foo',
      isRequired: true,
      itemType: 'input',
      label: 'TEST',
    } },
    layout: [
      {
        childRefs: ['edhnE7hWW'],
        id: 'page',
        type: 'page',
      },
      {
        id: 'edhnE7hWW',
        type: 'vertical-list',
        childRefs: ['gvJSMglZw'],
      },
      {
        id: 'gvJSMglZw',
        type: 'form-item',
        childRefs: [],
      },
    ],
    name: 'New Form',
    targetCommits: 0,
    receivedCommits: 0,
    maxCommits: 100,
    scope: 'private',
    status: 'open',
    type: 'form',
  };
  describe('getWriteRequestPayload', () => {
    it('should clean readonly fields', () => {
      const { author, createdAt, status, receivedCommits, ...expected } = input;
      expect(getWriteRequestPayload(input)).toEqual(expected);
    });
    /*
    it('should flattern target datasource', () => {
      const { author, createdAt, status, receivedCommits, ...restProps } = input;
      const modifiedInput = {
        ...restProps,
        items: {
          foo: {
            enableDataBinding: true,
            id: 'foo',
            isRequired: true,
            itemType: 'input',
            label: 'TEST',
            targetDataSource: {
              id: '1',
              fieldId: '2',
              name: 'target data',
            },
          },
        },
      };
      expect(getWriteRequestPayload(modifiedInput)).toEqual({
        ...restProps,
        items: {
          foo: {
            enableDataBinding: true,
            id: 'foo',
            isRequired: true,
            itemType: 'input',
            label: 'TEST',
            targetDataSourceId: '1',
            targetFieldId: '2',
          },
        },
      });
    });
    */
  });
});

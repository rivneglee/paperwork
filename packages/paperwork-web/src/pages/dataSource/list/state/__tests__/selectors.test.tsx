import { getEntries } from '../selectors';
import { RouterState } from 'connected-react-router';

describe('dataSourceListPage', () => {
  const state: any = {
    authentication: {
      accessToken: '123',
      user: {
        id: '1',
        username: 'alex',
        displayName: 'alex li',
      },
    },
    page: {
      dataSourceList: {
        data: [
          {
            id: '1',
            name: 'DS_1',
            owner: '2',
          },
          {
            id: '2',
            name: 'DS_2',
            owner: '1',
          },
        ],
        filterOptions: {},
      },
    },
    router: {} as RouterState,
  };

  describe('getEntries', () => {
    it('should return correct entries', () => {
      const expected = [
        {
          id: '1',
          name: 'DS_1',
          owner: '2',
          badges: [{
            color: 'secondary',
            text: 'Collaborative',
          }],
          link: '/dataSource/1',
        },
        {
          id: '2',
          name: 'DS_2',
          owner: '1',
          badges: [],
          link: '/dataSource/2',
        },
      ];
      expect(getEntries(state)).toEqual(expected);
    });
  });
});

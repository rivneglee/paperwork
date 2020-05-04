import { getEntries } from '../selectors';

describe('dataSourceListPage', () => {
  const state = {
    authentication: {
      accessToken: '123',
      user: {
        id: '1',
        username: 'alex',
        displayName: 'alex li',
      },
    },
    page: {
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
          link: '/1/dataSource/1',
        },
        {
          id: '2',
          name: 'DS_2',
          owner: '1',
          badges: [],
          link: '/1/dataSource/2',
        },
      ];
      expect(getEntries(state)).toEqual(expected);
    });
  });
});
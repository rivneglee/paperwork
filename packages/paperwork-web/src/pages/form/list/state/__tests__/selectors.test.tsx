import { getEntries } from '../selectors';
import { RouterState } from 'connected-react-router';

describe('form list page selector', () => {
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
      formList: {
        entries: [
          {
            id: '1',
            name: 'Employee engagement survey',
            author: {
              id: '1',
              displayName: 'LI,CHENG',
            },
            theme: 'purple',
            scope: 'public',
            status: 'open',
            receivedCommits: 10,
            targetCommits: 100,
            maxCommits: 250,
            closeDate: '30/07/2020',
          },
          {
            id: '2',
            name: 'Feedback collection',
            author: {
              id: '1',
              displayName: 'LI,CHENG',
            },
            theme: 'pink',
            scope: 'private',
            status: 'closed',
            receivedCommits: 10,
          },
          {
            id: '3',
            name: 'Feedback collection',
            author: {
              id: '1',
              displayName: 'LI,CHENG',
            },
            theme: 'pink',
            scope: 'private',
            status: 'closed',
            receivedCommits: 10,
            targetCommits: 100,
          },
        ],
        filterOptions: {},
      },
    },
    router: {} as RouterState,
  };

  describe('getEntries', () => {
    it('should return correct entries', () => {
      const expected: any = [
        {
          author: { displayName: 'LI,CHENG', id: '1' },
          closeDate: '30/07/2020',
          id: '1',
          isPublic: true,
          maxCommits: 250,
          name: 'Employee engagement survey',
          receivedCommits: 10,
          scope: 'public',
          status: 'OPEN',
          statusBadgeColor: 'secondary',
          targetCommits: 100,
          theme: 'purple',
          maxGap: 140,
          targetGap: 90,
          progress: '10%',
        },
        {
          author: { displayName: 'LI,CHENG', id: '1' },
          closeDate: '--/--/--',
          id: '2',
          isPublic: false,
          maxCommits: '--',
          name: 'Feedback collection',
          receivedCommits: 10,
          scope: 'private',
          status: 'CLOSED',
          statusBadgeColor: 'danger',
          targetCommits: '--',
          theme: 'pink',
          maxGap: 0,
          targetGap: 0,
          progress: '',
        },
        {
          author: { displayName: 'LI,CHENG', id: '1' },
          closeDate: '--/--/--',
          id: '3',
          isPublic: false,
          targetCommits: 100,
          maxCommits: '--',
          name: 'Feedback collection',
          receivedCommits: 10,
          scope: 'private',
          status: 'CLOSED',
          statusBadgeColor: 'danger',
          theme: 'pink',
          maxGap: 0,
          targetGap: 90,
          progress: '10%',
        },
      ];
      expect(getEntries(state)).toEqual(expected);
    });
  });
});

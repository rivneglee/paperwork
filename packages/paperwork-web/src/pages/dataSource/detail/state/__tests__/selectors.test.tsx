import { getGrantField, getIsOwner } from '../selectors';

const state: any = {
  page: {
    dataSourceDetail: {
      data: {
        id: '1',
        name: 'Engagement survey 2020',
        owner: '1',
        fields: [
          {
            id: '123',
            name: 'STAFF_NAME',
            grants: [
              {
                collaborator: {
                  id: '123',
                  displayName: 'CHENG LI',
                },
                level: 'wr',
                id: '7m_cnPB2XE',
              },
              {
                collaborator: {
                  id: '321',
                  displayName: 'JESSIE HAN',
                },
                level: 'r',
                id: 'ivLRUE2Itx',
              },
            ],
          },
          {
            id: '321',
            name: 'RATING',
            grants: [],
          },
        ],
      },
      isPageEdited: false,
    },
  },
  authentication: {
    accessToken: 'foo',
    user: {
      id: '1',
      username: 'rivneg',
      displayName: 'LI,CHENG',
    },
  },
};

describe('datasource detail page selectors', () => {
  describe('getGrantField', () => {
    it('should return null if editingGrantsField is not set', () => {
      expect(getGrantField(state)).toBe(null);
    });
    it('should return null if editingGrantsField is not set', () => {
      expect(getGrantField({
        ...state,
        page: {
          dataSourceDetail: {
            ...state.page.dataSourceDetail,
            editingGrantsField: '321',
          },
        },
      })).toEqual({
        id: '321',
        name: 'RATING',
        grants: [],
      });
    });
  });

  describe('getIsOwner', () => {
    it('should return true if datasource owner equals to authentication', () => {
      expect(getIsOwner(state)).toBe(true);
    });

    it('should return false if datasource owner doesn\'t equal to authentication', () => {
      expect(getIsOwner({
        ...state,
        page: {
          dataSourceDetail: {
            data: {
              ...state.page.dataSourceDetail.data,
              owner: '321',
            },
          },
        },
      })).toBe(false);
    });
  });
});

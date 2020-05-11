import { mapping } from '../reducers';
import {
  ADD_FIELD,
  ADD_GRANT,
  UPDATE_GRANT,
  REMOVE_FIELD,
  UPDATE_FIELD,
  REMOVE_GRANT,
} from '../actions';
import { GrantLevel } from '../../../../../schema/DataSource';

describe('data source detail reducers', () => {
  const state: any = {
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
                  id: '2',
                  username: 'rin',
                  displayName: 'Rin',
                },
                level: GrantLevel.WRITE,
              },
            ],
          },
        ],
      },
      isPageEdited: false,
      editingGrantsField: '123',
    },
  };

  it('ADD_FIELD', () => {
    expect(mapping[ADD_FIELD](state, {
      newField: { id: 'foo', grants: [], name: '321' },
      type: ADD_FIELD,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [
            {
              id: '123',
              name: 'STAFF_NAME',
              grants: [
                {
                  collaborator: {
                    id: '2',
                    username: 'rin',
                    displayName: 'Rin',
                  },
                  level: GrantLevel.WRITE,
                },
              ],
            },
            { id: 'foo', grants: [], name: '321' },
          ],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });

  it('UPDATE_FIELD', () => {
    expect(mapping[UPDATE_FIELD](state, {
      index: 0,
      key: 'name',
      value: 'new field name',
      type: UPDATE_FIELD,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [
            {
              id: '123',
              name: 'new field name',
              grants: [
                {
                  collaborator: {
                    id: '2',
                    username: 'rin',
                    displayName: 'Rin',
                  },
                  level: GrantLevel.WRITE,
                },
              ],
            },
          ],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });

  it('REMOVE_FIELD', () => {
    expect(mapping[REMOVE_FIELD](state, {
      index: 0,
      type: REMOVE_FIELD,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });

  it('ADD_GRANT', () => {
    expect(mapping[ADD_GRANT](state, {
      newGrant: {
        collaborator: {
          id: '1',
          username: 'fake',
          displayName: 'fake',
        },
        level: GrantLevel.WRITE,
      },
      type: ADD_GRANT,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [
            {
              id: '123',
              name: 'STAFF_NAME',
              grants: [
                {
                  collaborator: {
                    id: '2',
                    username: 'rin',
                    displayName: 'Rin',
                  },
                  level: GrantLevel.WRITE,
                },
                {
                  collaborator: {
                    id: '1',
                    username: 'fake',
                    displayName: 'fake',
                  },
                  level: GrantLevel.WRITE,
                },
              ],
            },
          ],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });

  it('UPDATE_GRANT', () => {
    expect(mapping[UPDATE_GRANT](state, {
      index: 0,
      key: 'level',
      value: GrantLevel.READ,
      type: UPDATE_GRANT,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [
            {
              id: '123',
              name: 'STAFF_NAME',
              grants: [
                {
                  collaborator: {
                    id: '2',
                    username: 'rin',
                    displayName: 'Rin',
                  },
                  level: GrantLevel.READ,
                },
              ],
            },
          ],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });

  it('REMOVE_GRANT', () => {
    expect(mapping[REMOVE_GRANT](state, {
      index: 0,
      type: REMOVE_GRANT,
    })).toEqual({
      dataSourceDetail: {
        data: {
          ...state.dataSourceDetail.data,
          fields: [
            {
              id: '123',
              name: 'STAFF_NAME',
              grants: [],
            },
          ],
        },
        isPageEdited: true,
        editingGrantsField: '123',
      },
    });
  });
});

import { DataSource, GrantLevel } from '../../../../schema/DataSource';
import {
  LoadDataSourceDetailAction,
  AddFieldAction,
  LOAD_DATASOURCE_DETAIL,
  ADD_FIELD,
  UPDATE_FIELD,
  UpdateFieldAction,
  REMOVE_FIELD,
  RemoveFieldAction,
  UPDATE_DETAIL,
  UpdateDetailAction,
  SetGrantFieldAction,
  SET_GRANT_FIELD,
  ADD_GRANT,
  UPDATE_GRANT,
  REMOVE_GRANT,
  AddGrantAction,
  UpdateGrantAction,
  RemoveGrantAction,
} from './actions';
import { PageState } from '../../../../store';

export interface DataSourceDetailPageState {
  data: DataSource;
  isPageEdited: boolean;
  editingGrantsField?: string;
}

export const defaultState: DataSourceDetailPageState = {
  data: {
    id: '',
    name: '',
    owner: '',
    fields: [],
  },
  isPageEdited: false,
  editingGrantsField: undefined,
};

const loadDataSourceDetail = (
  state: PageState,
  action: LoadDataSourceDetailAction,
) => ({
  ...state,
  dataSourceDetail: {
    ...state.dataSourceDetail,
    data: action.data,
  },
});

const addDataSourceField = (
  state: PageState,
  action: AddFieldAction,
) => ({
  ...state,
  dataSourceDetail: {
    ...state.dataSourceDetail,
    isPageEdited: true,
    data: {
      ...state.dataSourceDetail.data,
      fields: [...state.dataSourceDetail.data.fields, action.newField],
    },
  },
});

const updateDataSourceField = (
  state: PageState,
  action: UpdateFieldAction,
) => {
  const { index, value, key } = action;
  const { fields = [] } = state.dataSourceDetail.data;
  const newFields = fields.map((field, i) => {
    if (i === index) {
      return {
        ...field,
        [key]: value,
      };
    }
    return field;
  });
  return {
    ...state,
    dataSourceDetail: {
      ...state.dataSourceDetail,
      isPageEdited: true,
      data: {
        ...state.dataSourceDetail.data,
        fields: newFields,
      },
    },
  };
};

const removeDataSourceField = (
  state: PageState,
  action: RemoveFieldAction,
) => {
  const { index } = action;
  const { fields = [] } = state.dataSourceDetail.data;
  const newFields = fields.filter((field, i) => i !== index);
  return {
    ...state,
    dataSourceDetail: {
      ...state.dataSourceDetail,
      isPageEdited: true,
      data: {
        ...state.dataSourceDetail.data,
        fields: newFields,
      },
    },
  };
};

const updateDataSourceDetail = (
  state: PageState,
  action: UpdateDetailAction,
) => ({
  ...state,
  dataSourceDetail: {
    ...state.dataSourceDetail,
    isPageEdited: true,
    data: {
      ...state.dataSourceDetail.data,
      [action.key]: action.value,
    },
  },
});

const setGrantField = (
  state: PageState,
  action: SetGrantFieldAction,
) => ({
  ...state,
  dataSourceDetail: {
    ...state.dataSourceDetail,
    editingGrantsField: action.fieldId,
  },
});

const addGrant = (
  state: PageState,
  action: AddGrantAction,
) => {
  const { dataSourceDetail: { editingGrantsField, data } } = state;
  const newGrant = { grantLevel: GrantLevel.READ_AND_WRITE, ...action.newGrant };
  const newFields = data.fields.map((field) => {
    if (field.id === editingGrantsField) {
      return {
        ...field,
        grants: [...field.grants, newGrant],
      };
    }
    return field;
  });

  return {
    dataSourceDetail: {
      ...state.dataSourceDetail,
      isPageEdited: true,
      data: {
        ...state.dataSourceDetail.data,
        fields: newFields,
      },
    },
  };
};

const updateGrant = (
  state: PageState,
  action: UpdateGrantAction,
) => {
  const { dataSourceDetail: { editingGrantsField, data } } = state;
  const newFields = data.fields.map((field) => {
    if (field.id === editingGrantsField) {
      const newGrants = field.grants.map((grant, index) => {
        if (index !== action.index) return grant;
        return {
          ...grant,
          [action.key]: action.value,
        };
      });
      return {
        ...field,
        grants: newGrants,
      };
    }
    return field;
  });

  return {
    dataSourceDetail: {
      ...state.dataSourceDetail,
      isPageEdited: true,
      data: {
        ...state.dataSourceDetail.data,
        fields: newFields,
      },
    },
  };
};

const removeGrant = (
  state: PageState,
  action: RemoveGrantAction,
) => {
  const { dataSourceDetail: { editingGrantsField, data } } = state;
  const newFields = data.fields.map((field) => {
    if (field.id === editingGrantsField) {
      const newGrants = field.grants.filter((_, index) => index !== action.index);
      return {
        ...field,
        grants: newGrants,
      };
    }
    return field;
  });

  return {
    dataSourceDetail: {
      ...state.dataSourceDetail,
      isPageEdited: true,
      data: {
        ...state.dataSourceDetail.data,
        fields: newFields,
      },
    },
  };
};

export const mapping = {
  [LOAD_DATASOURCE_DETAIL]: loadDataSourceDetail,
  [UPDATE_DETAIL]: updateDataSourceDetail,
  [ADD_FIELD]: addDataSourceField,
  [UPDATE_FIELD]: updateDataSourceField,
  [REMOVE_FIELD]: removeDataSourceField,
  [SET_GRANT_FIELD]: setGrantField,
  [ADD_GRANT]:  addGrant,
  [UPDATE_GRANT]: updateGrant,
  [REMOVE_GRANT]: removeGrant,
};

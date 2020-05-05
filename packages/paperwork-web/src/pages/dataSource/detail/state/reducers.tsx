import { DataSource } from '../../../../schema/DataSource';
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
} from './actions';
import { PageState } from '../../../../store';

export interface DataSourceDetailPageState {
  data: DataSource;
  isPageEdited: boolean;
}

export const defaultState: DataSourceDetailPageState = {
  data: {
    id: '',
    name: '',
    owner: '',
    fields: [],
    collaborators: [],
  },
  isPageEdited: false,
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

export const mapping = {
  [LOAD_DATASOURCE_DETAIL]: loadDataSourceDetail,
  [UPDATE_DETAIL]: updateDataSourceDetail,
  [ADD_FIELD]: addDataSourceField,
  [UPDATE_FIELD]: updateDataSourceField,
  [REMOVE_FIELD]: removeDataSourceField,
};

import { DataSource, Field } from '../../../../schema/DataSource';

export const LOAD_DATASOURCE_DETAIL = 'DATASOURCE_DETAIL_LOAD_DATASOURCE';
export const ADD_FIELD = 'DATASOURCE_DETAIL_ADD_FIELD';
export const UPDATE_FIELD = 'DATASOURCE_DETAIL_UPDATE_FIELD';
export const REMOVE_FIELD = 'DATASOURCE_DETAIL_REMOVE_FIELD';
export const UPDATE_DETAIL = 'DATASOURCE_DETAIL_UPDATE_DETAIL';

export interface LoadDataSourceDetailAction {
  data: DataSource;
  type: string;
}

export interface UpdateDetailAction {
  key: string;
  value: any;
  type: string;
}

export interface AddFieldAction {
  newField: Field;
  type: string;
}

export interface UpdateFieldAction {
  index: number;
  key: string;
  value: any;
  type: string;
}

export interface RemoveFieldAction {
  index: number;
  type: string;
}

export const createLoadDataSourceDetailAction = (dataSource: DataSource): LoadDataSourceDetailAction => {
  return {
    data: dataSource,
    type: LOAD_DATASOURCE_DETAIL,
  };
};

export const createUpdateDetailAction = (key: string, value: any): UpdateDetailAction => {
  return {
    key,
    value,
    type: UPDATE_DETAIL,
  };
};

export const createAddFieldAction = (id: string, key: string, value: any): AddFieldAction => {
  return {
    newField: {
      id,
      [key]: value,
    } as Field,
    type: ADD_FIELD,
  };
};

export const createUpdateFieldAction = (index: number, key: string, value: any): UpdateFieldAction => {
  return {
    index,
    key,
    value,
    type: UPDATE_FIELD,
  };
};

export const createRemoveFieldAction = (index: number): RemoveFieldAction => {
  return {
    index,
    type: REMOVE_FIELD,
  };
};

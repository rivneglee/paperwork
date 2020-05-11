import { DataSource, Field, Grant } from '../../../../schema/DataSource';

export const LOAD_DATASOURCE_DETAIL = 'DATASOURCE_DETAIL_LOAD_DATASOURCE';
export const ADD_FIELD = 'DATASOURCE_DETAIL_ADD_FIELD';
export const UPDATE_FIELD = 'DATASOURCE_DETAIL_UPDATE_FIELD';
export const REMOVE_FIELD = 'DATASOURCE_DETAIL_REMOVE_FIELD';
export const UPDATE_DETAIL = 'DATASOURCE_DETAIL_UPDATE_DETAIL';
export const SET_GRANT_FIELD = 'DATASOURCE_DETAIL_SET_GRANT_FIELD';
export const ADD_GRANT = 'DATASOURCE_DETAIL_ADD_GRANT';
export const UPDATE_GRANT = 'DATASOURCE_DETAIL_UPDATE_GRANT';
export const REMOVE_GRANT = 'DATASOURCE_DETAIL_REMOVE_GRANT';

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

export interface AddGrantAction {
  newGrant: Grant;
  type: string;
}

export interface UpdateGrantAction {
  index: number;
  key: string;
  value: any;
  type: string;
}

export interface RemoveGrantAction {
  index: number;
  type: string;
}

export interface SetGrantFieldAction {
  fieldId?: string;
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

export const createSetGrantFieldAction = (fieldId?: string): SetGrantFieldAction => {
  return {
    fieldId,
    type: SET_GRANT_FIELD,
  };
};

export const createAddGrantAction = (key: string, value: any): AddGrantAction => {
  return {
    newGrant: {
      [key]: value,
    } as Grant,
    type: ADD_GRANT,
  };
};

export const createUpdateGrantAction = (index: number, key: string, value: any): UpdateGrantAction => {
  return {
    index,
    key,
    value,
    type: UPDATE_GRANT,
  };
};

export const createRemoveGrantAction = (index: number): RemoveGrantAction => {
  return {
    index,
    type: REMOVE_GRANT,
  };
};

import { TemplateList } from '../../../../schema/Template';

export interface TemplateListPageState {
  entries: TemplateList;
}

export const defaultState: TemplateListPageState = {
  entries: [],
};

export const mapping = {};

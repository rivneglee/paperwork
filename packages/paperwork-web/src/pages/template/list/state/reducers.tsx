import { PageList } from '../../../../schema/Paper';

export interface TemplateListPageState {
  entries: PageList;
}

export const defaultState: TemplateListPageState = {
  entries: [],
};

export const mapping = {};

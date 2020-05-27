export enum DragAndDropType {
  LAYOUT = 'layout', ITEM = 'item',
}

export enum LayoutNodeTypes {
  PAGE = 'page', SIMPLE_LIST = 'simple-list', FORM_ITEM  = 'form-item',
}

export interface LayoutLinkedNode {
  id: string;
  type: LayoutNodeTypes;
  childRefs: string[];
}

export type Layout = LayoutLinkedNode[];

export interface Item {
  id: string;
  itemType: string;
  disabled?: boolean;
  [key: string]: any;
}

export type Items = {[key: string]: Item};

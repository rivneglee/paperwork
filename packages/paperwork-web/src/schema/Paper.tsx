export interface PaperItem {
  id: string;
  type: string;
  options: any;
}

export interface LayoutReference {
  id: string;
}

export enum LayoutTypes {
  Page = 'page', SimpleList = 'simple-list', Item = 'item',
}

export interface LayoutLinkedNode {
  id: string;
  type: LayoutTypes;
  childRefs: LayoutReference[];
}

export type Layout = LayoutLinkedNode[];

export enum PaperType {
  FORM = 'Form', REPORT = 'Report',
}

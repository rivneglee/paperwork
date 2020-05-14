import { User } from './User';

export interface PaperItem {
  id: string;
  type: string;
  appearanceProps: any;
}

export interface ItemStore {
  [key: string]: PaperItem;
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

export type LayoutStore = LayoutLinkedNode[];

export enum PaperType {
  FORM = 'Form', REPORT = 'Report',
}

export interface Paper {
  id: string;
  name: string;
  author: User;
  type: PaperType;
}

export interface PaperDetail extends Paper {
  layoutStore: LayoutStore;
  itemStore: ItemStore;
}

export type PageList = Paper[];

import { ComponentType } from 'react';
import { DropResult } from 'react-beautiful-dnd';

export enum DragAndDropType {
  LAYOUT = 'layout', ITEM = 'item',
}

export enum FormMode {
  DESIGN = 'design', EDIT = 'edit', READONLY = 'readonly',
}

export enum LayoutNodeTypes {
  PAGE = 'page', SIMPLE_LIST = 'simple-list', FORM_ITEM  = 'form-item',
}

export type FormThemeColors = 'red' | 'pink' | 'purple' | 'indigo'
  | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green'
  | 'light-green' | 'lime' | 'yellow' | 'amber'
  | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';

export interface LayoutLinkedNode {
  id: string;
  type: LayoutNodeTypes;
  childRefs: string[];
}

export type Layout = LayoutLinkedNode[];

export interface Item {
  id: string;
  itemType: string;
  readonly?: boolean;
  value?: any;
  [key: string]: any;
}

export type Items = {[key: string]: Item};

export interface ItemMetadata {
  MainView: ComponentType<any>;
  SettingsView?: ComponentType<any>;
}

export type DropEvent = DropResult;

export interface AddEvent {
  newLayoutNode: LayoutLinkedNode;
  newItem?: Item;
  targetId: string;
  targetPosition: number;
}

export interface MoveEvent {
  sourceId: string;
  sourcePosition: number;
  targetId: string;
  targetPosition: number;
}

export interface FormProps {
  headerImage?: string;
  theme?: FormThemeColors;
  name: string;
  layout: Layout;
  items: Items;
}

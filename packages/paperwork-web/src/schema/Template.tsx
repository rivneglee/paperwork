import { Items, Layout } from '@paperwork/ui-widgets';
import { User } from './User';
import { PaperItem, PaperType } from './Paper';
import { Pagination } from './Pagination';

export interface Template {
  id: string;
  name: string;
  author: User;
  type: PaperType;
  visibility: 'private' | 'protected' | 'public';
  tags: string[];
  heroImage: string;
  themeColor: 'red' | 'pink' | 'purple' | 'indigo'
    | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green'
    | 'light-green' | 'lime' | 'yellow' | 'amber'
    | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';
}

export interface Item extends PaperItem {}

export interface TemplateDetail extends Template {
  layout: Layout;
  items: Items;
}

export interface TemplateList {
  entries: Template[];
  pagination: Pagination;
}

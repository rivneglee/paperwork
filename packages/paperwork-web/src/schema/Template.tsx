import { User } from './User';
import { Layout, PaperItem, PaperType } from './Paper';

export interface Template {
  id: string;
  name: string;
  author: User;
  type: PaperType;
  tags: string[];
  heroImage: string;
}

export interface Item extends PaperItem {}

export interface TemplateDetail extends Template {
  layout: Layout;
  items: { [key: string]: Item };
}

export type TemplateList = Template[];

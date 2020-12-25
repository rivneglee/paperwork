import { User } from './User';
import { Pagination } from './Pagination';
import { Paper, PaperAppearance } from './Paper';

export interface Template extends Paper {
  author: User;
  visibility: 'private' | 'protected' | 'public';
  tags: string[];
  isOwner?: boolean;
}

export type TemplateDetail = PaperAppearance & Template;

export interface TemplateList {
  entries: Template[];
  pagination: Pagination;
}

import { User } from './User';
import { Pagination } from './Pagination';
import { Paper, PaperAppearance } from './Paper';

export enum Status {
  OPEN = 'open', CLOSED = 'closed',
}

export enum Scope {
  PUBLIC = 'public', PRIVATE = 'private',
}

export interface Form extends Paper {
  author: User;
  status: Status;
  scope: Scope;
  createdAt: string;
  closeDate?: string;
  targetCommits?: number;
  maxCommits?: number;
  receivedCommits: number;
}

export interface FormList {
  entries: Form[];
  pagination: Pagination;
}

export type FormDetail = PaperAppearance & Form;

import { FormProps } from '@paperwork/ui-widgets';
import { Pagination } from './Pagination';
import { User } from './User';

export interface Commit {
  id: string;
  name: string;
  committer: User;
  createdAt: string;
  sourceFormId: string;
}

export interface CommitList {
  entries: Commit[];
  pagination: Pagination;
}

export interface CommitDetail extends FormProps {
  id?: string;
  sourceFormId: string;
  values: {
    [fieldId: string]: any;
  };
}

/* Commit at backend
export interface Document {
  id?: string;
  dataSourceId: string;
  values: {
    [fieldId: string]: any;
  };
}

export interface Commit {
  committer: UserIdentifier;
  sourceFormId: string;
  documentIds: string[];
}
*/

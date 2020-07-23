import { FormProps } from '@paperwork/ui-widgets';

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

import { UserIdentifier } from './User';

export enum GrantLevel {
  READ = 'r', WRITE = 'w', READ_AND_WRITE = 'wr',
}

export interface Grant {
  collaborator: UserIdentifier;
  level: GrantLevel;
}

export interface Field {
  id: string;
  displayName: string;
  grants: Grant[];
}

export interface DataSource {
  id: string;
  owner: UserIdentifier;
  fields: Field[];
  collaborators: UserIdentifier[];
}

export interface Document {
  id: string;
  dataSourceId: string;
  values: { [fieldId: string]: any };
}

export interface Fragment {
  dataSourceId: string;
  documentId: string;
}

export interface Commit {
  id: string;
  paperId: string;
  committer: UserIdentifier;
  fragments: Fragment[];
}

export interface CommitRequest {
  paperId: string;
  committer: UserIdentifier;
  groupedValues: {
    [datasourceId: string]: {
      documentId?: string;
      values: {
        [fieldId: string]: any;
      };
    };
  };
}

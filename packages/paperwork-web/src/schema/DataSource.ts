// export interface Document {
//   id: string;
//   dataSourceId: string;
//   values: { [fieldId: string]: any };
// }
//
// export interface Fragment {
//   dataSourceId: string;
//   documentId: string;
// }
//
// export interface Commit {
//   id: string;
//   paperId: string;
//   committer: UserIdentifier;
//   fragments: Fragment[];
// }
//
// export interface CommitRequest {
//   paperId: string;
//   committer: UserIdentifier;
//   groupedValues: {
//     [datasourceId: string]: {
//       documentId?: string;
//       values: {
//         [fieldId: string]: any;
//       };
//     };
//   };
// }

import { User, UserIdentifier } from './User';

export enum GrantLevel {
  READ = 'r', WRITE = 'w', READ_AND_WRITE = 'wr',
}

export interface Grant {
  collaborator: User;
  level: GrantLevel;
}

export interface Field {
  id: string;
  name: string;
  grants: Grant[];
}

export type DataSourceList = {
  id: string;
  name: string;
  owner: UserIdentifier;
}[];

export interface DataSource {
  id: string;
  name: string;
  owner: User;
  fields: Field[];
}

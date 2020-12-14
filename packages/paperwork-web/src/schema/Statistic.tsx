import { Pagination } from './Pagination';
import { User } from './User';

interface AggregatedCommit {
  id: string;
  sourceFormId: string;
  committer: User;
  createdAt: string;
  values: {
    [fieldId: string]: any;
  };
}

// interface AggregatedCommit {
//   [dataSourceId: string]: SingleCommit;
// }

export interface AggregatedCommits {
  entries: AggregatedCommit[];
  pagination: Pagination;
}

import { User } from './User';
import { Pagination } from './Pagination';
import { PaperAppearance } from './Paper';

export interface Report {
  id: string;
  name: string;
  author: User;
  createdAt: string;
}

export interface ReportList {
  entries: Report[];
  pagination: Pagination;
}

export type ReportDetail = PaperAppearance & Report & { sharedWith: string[] };

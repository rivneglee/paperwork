import React, { FunctionComponent } from 'react';
import { Card, PageState, PaginationTemplate, Search } from '@paperwork/ui-widgets';

import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Commit } from '../../../../schema/Commit';
import AppBar from '../../../../components/AppBar/AppBar';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';
import UserCommitListTable from './UserCommitListTable';
import FormCommitListTable from './FormCommitListTable';

const noResultFoundImg = require('../../../../assets/no-results-found.svg');
import './CommitListPage.scss';

interface Props {
  entries: Commit[];
  page: number;
  total: number;
  groupBy: GroupBy;
  isProcessing?: boolean;
  filterOptions: FilterOptions;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  onView: (formId: string, commitId: string) => void;
}

export enum GroupBy {
  FORM = 'form', COMMITTER = 'committer',
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

const CommitListPage: FunctionComponent<Props> = ({
  entries,
  page,
  total,
  isProcessing,
  onLoadNextPage,
  filterOptions,
  onFilterChange,
  onApplyFilter,
  onView,
  groupBy,
}) => {
  const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

  const tableView = groupBy === GroupBy.COMMITTER
    ? <UserCommitListTable entries={entries} onView={onView}/> : <FormCommitListTable entries={entries} onView={onView}/>;

  const view = entries.length === 0 ? (
    <PageState
      image={noResultFoundImg}
      title="No results found"
      description="Please try to improve your filter or create a new template"
    />
  ) : tableView;

  const pageHeader = groupBy === GroupBy.COMMITTER ? 'My commits' : 'Form commits';

  return (
    <PaginationTemplate
      spinner={<Spinner/>}
      isProcessing={isProcessing}
      header={<AppBar activeMenuId="commits"/>}
      onLoadMore={page => onLoadNextPage(filterOptions, page)}
      page={page}
      total={total}
    >
      <Card header={<Card.Header primary={pageHeader}/>}>
        <StickySideBar>
          <Search
            placeholder="Search"
            value={filterOptions.keyword}
            onChange={handleFilterChange('keyword', onFilterChange)}
            onApply={() => onApplyFilter(filterOptions)}
          />
        </StickySideBar>
        {view}
      </Card>
    </PaginationTemplate>
  );
};

export default CommitListPage;

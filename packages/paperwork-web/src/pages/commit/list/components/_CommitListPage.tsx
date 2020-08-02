import React, { FunctionComponent } from 'react';
import { Button, Icons, Card, Input, PageState, PaginationTemplate } from '@paperwork/ui-widgets';

import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Commit } from '../../../../schema/Commit';
import UserCommitListTable from './UserCommitListTable';
import FormCommitListTable from './FormCommitListTable';

const noResultFoundImg = require('../../../../assets/no-results-found.svg');
import './CommitListPage.scss';
import { FilterOption, FilterOptions, GroupBy } from './CommitListPage';
import FilterBar from '../../../../lite/FilterBar/FilterBar';
import AppBar from '../../../../lite/AppBar/AppBar';

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

  return (
    <PaginationTemplate
      spinner={<Spinner type="donut"/>}
      isProcessing={isProcessing}
      header={<AppBar/>}
      onLoadMore={page => onLoadNextPage(filterOptions, page)}
      page={page}
      total={total}
    >
      <FilterBar>
        <Input
          size="l"
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          left={<Icons.Search/>}
          right={<Button onClick={() => onApplyFilter(filterOptions)} type="link" color="primary">Apply</Button>}
        />
      </FilterBar>
      <Card>
        {view}
      </Card>
    </PaginationTemplate>
  );
};

export default CommitListPage;

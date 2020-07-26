import React, { FunctionComponent } from 'react';
import { Card, PageState, PaginationTemplate, Search, Table } from '@paperwork/ui-widgets';

import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { Commit } from '../../../../schema/Commit';
import AppBar from '../../../../components/AppBar/AppBar';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

const noResultFoundImg = require('../../../../assets/no-results-found.svg');

interface Props {
  entries: Commit[];
  page: number;
  total: number;
  isProcessing?: boolean;
  filterOptions: FilterOptions;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  onView: (formId: string, commitId: string) => void;
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

const UserCommitList: FunctionComponent<Props> = ({
  entries,
  page,
  total,
  isProcessing,
  onLoadNextPage,
  filterOptions,
  onFilterChange,
  onApplyFilter,
  onView,
}) => {
  const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

  return (
    <PaginationTemplate
      spinner={<Spinner/>}
      isProcessing={isProcessing}
      header={<AppBar activeMenuId="commits"/>}
      onLoadMore={page => onLoadNextPage(filterOptions, page)}
      page={page}
      total={total}
    >
      <Card header={<Card.Header primary="My commits"/>}>
        <StickySideBar>
          <Search
            placeholder="Search"
            value={filterOptions.keyword}
            onChange={handleFilterChange('keyword', onFilterChange)}
            onApply={() => onApplyFilter(filterOptions)}
          />
        </StickySideBar>
        {
          entries.length === 0 && (
            <PageState
              image={noResultFoundImg}
              title="No results found"
              description="Please try to improve your filter or create a new template"
            />
          )
        }
        {
          entries.length > 0 && (
            <Table>
              <Table.Header>
                <Table.HeaderItem>Form name</Table.HeaderItem>
                <Table.HeaderItem>Date</Table.HeaderItem>
              </Table.Header>
              <Table.Body>
                {
                  entries.map(entry => (
                    <Table.Row key={entry.id} onClick={() => onView(entry.sourceFormId, entry.id)}>
                      <Table.RowItem columnName="Form name">
                        {entry.name}
                      </Table.RowItem>
                      <Table.RowItem columnName="Date">{entry.createdAt}</Table.RowItem>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          )
        }
      </Card>
    </PaginationTemplate>
  );
};

export default UserCommitList;

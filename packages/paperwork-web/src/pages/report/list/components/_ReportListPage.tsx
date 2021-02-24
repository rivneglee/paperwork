import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  Card,
  PageState,
  Table,
  Input,
  Button,
  Icons,
} from '@paperwork/ui-widgets';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';

import './ReportListPage.scss';
import { Report } from '../../../../schema/Report';
import AppBar from '../../../../lite/AppBar/AppBar';
import FilterBar from '../../../../lite/FilterBar/FilterBar';
const noResultFoundImg = require('../../../../assets/no-results-found.svg');

interface Props {
  entries: Report[];
  page: number;
  total: number;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  filterOptions: FilterOptions;
  isProcessing?: boolean;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onCreateNew: () => void;
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

const ReportListPage: FunctionComponent<Props> = ({
  entries,
  onLoadNextPage,
  onApplyFilter,
  onView,
  onEdit,
  onCreateNew,
  onFilterChange,
  filterOptions,
  page,
  total,
  isProcessing,
}) => (
  <PaginationTemplate
    className="pwapp-report-list"
    spinner={<Spinner type="donut"/>}
    isProcessing={isProcessing}
    header={<AppBar/>}
    onLoadMore={page => onLoadNextPage(filterOptions, page)}
    page={page}
    total={total}
  >
    <Card>
      <FilterBar>
        <Input
          size="l"
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          left={<Icons.Search/>}
          right={<Button onClick={() => onApplyFilter(filterOptions)} type="link" color="primary">Apply</Button>}
        />
        <Button onClick={onCreateNew} size="l" color="secondary">Create</Button>
      </FilterBar>
    </Card>
    <Card>
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
              <Table.HeaderItem>Name</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {
                entries.map(entry => (
                  <Table.Row key={entry.id} onClick={() => onEdit(entry.id)}>
                    <Table.RowItem columnName="Name">
                      {entry.name}
                    </Table.RowItem>
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

export default ReportListPage;

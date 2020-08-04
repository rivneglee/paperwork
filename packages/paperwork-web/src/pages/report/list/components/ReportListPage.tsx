import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  QuickAdd,
  Search,
  Icons,
  Card,
  PageState,
  List,
} from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

import './ReportListPage.scss';
import { Report } from '../../../../schema/Report';
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
    spinner={<Spinner/>}
    isProcessing={isProcessing}
    header={<AppBar activeMenuId="reports"/>}
    onLoadMore={page => onLoadNextPage(filterOptions, page)}
    page={page}
    total={total}
  >
    <Card header={<Card.Header primary="My reports"/>}>
      <StickySideBar>
        <Search
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          onApply={() => onApplyFilter(filterOptions)}
        />
        <QuickAdd color="secondary">
          <QuickAdd.Item onClick={onCreateNew} icon={<Icons.Chart/>} tooltip="Create new report"/>
        </QuickAdd>
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
          <List>
            {
              entries.map(entry => (
                <List.Item>
                    {entry.name}
                </List.Item>
              ))
            }
          </List>
        )
      }
    </Card>
  </PaginationTemplate>
);

export default ReportListPage;
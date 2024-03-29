import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  QuickAdd,
  Search,
  Icons,
  Card,
  List,
  PageState,
} from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';
import FormInfoCard, { FormItem } from './FormInfoCard';

import './FormListPage.scss';
const noResultFoundImg = require('../../../../assets/no-results-found.svg');

interface Props {
  entries: FormItem[];
  page: number;
  total: number;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  filterOptions: FilterOptions;
  onViewCommits: (formId: string) => void;
  isProcessing?: boolean;
  onEdit: (id: string) => void;
  onCreateNew: (withDefaultDs: boolean) => void;
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

const FormListPage: FunctionComponent<Props> = ({
  entries,
  onLoadNextPage,
  onApplyFilter,
  onEdit,
  onCreateNew,
  onFilterChange,
  onViewCommits,
  filterOptions,
  page,
  total,
  isProcessing,
}) => (
  <PaginationTemplate
    className="pwapp-form-list"
    spinner={<Spinner/>}
    isProcessing={isProcessing}
    header={<AppBar activeMenuId="forms"/>}
    onLoadMore={page => onLoadNextPage(filterOptions, page)}
    page={page}
    total={total}
  >
    <Card header={<Card.Header primary="My forms"/>}>
      <StickySideBar>
        <Search
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          onApply={() => onApplyFilter(filterOptions)}
        />
        <QuickAdd color="secondary">
          <QuickAdd.Item onClick={() => onCreateNew(true)} icon={<Icons.FormWithDs/>} tooltip="Create new form with default datasource"/>
          <QuickAdd.Item onClick={() => onCreateNew(false)} icon={<Icons.Form/>} tooltip="Create new form and bind to existing datasource"/>
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
                <List.Item key={entry.id}>
                  <FormInfoCard {...entry} onEdit={onEdit} onViewCommits={onViewCommits}/>
                </List.Item>
              ))
            }
          </List>
        )
      }
    </Card>
  </PaginationTemplate>
);

export default FormListPage;
